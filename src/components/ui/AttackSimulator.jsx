import React, { useState, useEffect } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { Shield, AlertTriangle, CheckCircle, XCircle, Zap, Lock, Eye, Database, Skull, Sword, Bomb, Target, Flame, ShieldCheck, Network, Server, Globe, Wifi } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import AttackEffects from './AttackEffects';
import NetworkVisualization from './NetworkVisualization';
import Attack3DEffects from './Attack3DEffects';
import AudioEffects from './AudioEffects';
import OWASPAttacks from './OWASPAttacks';

const AttackSimulator = ({ onAttackPrevented, onAttackSuccess, onClose }) => {
  const [selectedAttack, setSelectedAttack] = useState('ddos');
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackStep, setAttackStep] = useState(0);
  const [mitigationActive, setMitigationActive] = useState(false);
  const [attackResult, setAttackResult] = useState(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [networkLogs, setNetworkLogs] = useState([]);
  const [viewMode, setViewMode] = useState('2d'); // '2d', '3d', 'network'
  const [showOWASP, setShowOWASP] = useState(false);

  const attackConfigs = {
    'ddos': {
      name: 'DDoS Attack',
      attackerIP: '192.168.1.100',
      targetIP: '10.0.0.50',
      port: '80',
      description: 'Sobrecargando el servidor con tráfico...',
      payload: 'Flood de paquetes HTTP',
      method: 'HTTP Flood',
      icon: '🌊',
      color: 'red'
    },
    'phishing': {
      name: 'Phishing Attack',
      attackerIP: '172.16.0.25',
      targetIP: '10.0.0.50',
      port: '443',
      description: 'Enviando emails maliciosos...',
      payload: 'Email con enlace falso',
      method: 'SMTP/HTTPS',
      icon: '🎣',
      color: 'orange'
    },
    'malware': {
      name: 'Malware Injection',
      attackerIP: '203.0.113.42',
      targetIP: '10.0.0.50',
      port: '8080',
      description: 'Inyectando código malicioso...',
      payload: 'Trojan.exe',
      method: 'File Upload',
      icon: '🦠',
      color: 'purple'
    },
    'bruteforce': {
      name: 'Brute Force',
      attackerIP: '198.51.100.15',
      targetIP: '10.0.0.50',
      port: '22',
      description: 'Probando credenciales...',
      payload: 'admin:password123',
      method: 'SSH Attack',
      icon: '💥',
      color: 'yellow'
    },
    'mitm': {
      name: 'Man-in-the-Middle',
      attackerIP: '10.0.0.100',
      targetIP: '10.0.0.50',
      port: '443',
      description: 'Interceptando comunicaciones...',
      payload: 'SSL Certificate Spoof',
      method: 'Network Interception',
      icon: '🕵️',
      color: 'blue'
    }
  };

  // Mapeo de ataques OWASP a configuraciones existentes
  const owaspToConfigMap = {
    'injection': 'ddos',
    'broken-auth': 'bruteforce',
    'sensitive-data': 'phishing',
    'xxe': 'malware',
    'broken-access': 'bruteforce',
    'security-misconfig': 'bruteforce',
    'xss': 'phishing',
    'insecure-deserialization': 'malware',
    'known-vulns': 'ddos',
    'insufficient-logging': 'mitm'
  };

  const getConfig = () => {
    // Si es un ataque OWASP, mapear a configuración existente
    if (owaspToConfigMap[selectedAttack]) {
      return attackConfigs[owaspToConfigMap[selectedAttack]];
    }
    // Si es un ataque directo, usar la configuración existente
    return attackConfigs[selectedAttack];
  };

  const config = getConfig() || attackConfigs['ddos'] || {
    name: 'DDoS Attack',
    attackerIP: '192.168.1.100',
    targetIP: '10.0.0.50',
    port: '80',
    description: 'Sobrecargando el servidor con tráfico...',
    payload: 'Flood de paquetes HTTP',
    method: 'HTTP Flood',
    icon: '🌊',
    color: 'red'
  };

  const generateNetworkLog = (step) => {
    const logs = [
      `[${new Date().toLocaleTimeString()}] ${config.attackerIP} -> ${config.targetIP}:${config.port} - ${config.method}`,
      `[${new Date().toLocaleTimeString()}] Payload: ${config.payload}`,
      `[${new Date().toLocaleTimeString()}] Scanning for vulnerabilities...`,
      `[${new Date().toLocaleTimeString()}] Attempting ${config.name.toLowerCase()}...`
    ];
    return logs[step] || `[${new Date().toLocaleTimeString()}] Attack in progress...`;
  };

  const startAttack = () => {
    setIsAttacking(true);
    setAttackStep(0);
    setAttackResult(null);
    setShowExplosion(false);
    setNetworkLogs([]);
    
    // Simular progreso del ataque con logs de red
    const interval = setInterval(() => {
      setAttackStep(prev => {
        const newLog = generateNetworkLog(prev);
        setNetworkLogs(current => [...current, newLog]);
        
        if (prev >= 3) {
          clearInterval(interval);
          // Simular si la mitigación es efectiva
          const isPrevented = Math.random() < 0.8; // 80% de probabilidad de éxito
          if (isPrevented) {
            setMitigationActive(true);
            setAttackResult('prevented');
            setNetworkLogs(current => [...current, `[${new Date().toLocaleTimeString()}] 🛡️ ATTACK BLOCKED by firewall`]);
            onAttackPrevented?.();
          } else {
            setAttackResult('success');
            setShowExplosion(true);
            setNetworkLogs(current => [...current, `[${new Date().toLocaleTimeString()}] 💀 SYSTEM COMPROMISED`]);
            onAttackSuccess?.();
          }
          setIsAttacking(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetSimulation = () => {
    setIsAttacking(false);
    setAttackStep(0);
    setMitigationActive(false);
    setAttackResult(null);
    setShowExplosion(false);
    setNetworkLogs([]);
  };

  // Animaciones de red
  const attackerAnimation = useSpring({
    x: isAttacking ? 0 : -100,
    scale: isAttacking ? 1.1 : 1,
    config: { tension: 300, friction: 10 }
  });

  const targetAnimation = useSpring({
    scale: mitigationActive ? 1.2 : 1,
    config: { tension: 200, friction: 5 }
  });

  const networkFlowAnimation = useSpring({
    opacity: isAttacking ? 1 : 0,
    x: isAttacking ? 200 : 0,
    config: { tension: 100, friction: 20 }
  });

  const explosionAnimation = useSpring({
    scale: showExplosion ? 1.5 : 0,
    opacity: showExplosion ? 1 : 0,
    config: { tension: 100, friction: 20 }
  });

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-900 to-gray-900 text-white overflow-hidden relative">
      {/* Fondo de red */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Skull className="w-8 h-8 text-red-400" />
              Simulador de Ataques de Red
            </h3>
            <p className="text-lg text-gray-300">
              Simulación de ataques cibernéticos en tiempo real
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={startAttack}
              disabled={isAttacking}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                isAttacking
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25'
              }`}
            >
              {isAttacking ? '⚔️ Atacando...' : '🚀 Iniciar Ataque'}
            </button>
            <button
              onClick={resetSimulation}
              className="px-6 py-3 rounded-lg text-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Selector de Ataques */}
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-400" />
            Seleccionar Tipo de Ataque
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(attackConfigs).map(([key, attack]) => (
              <button
                key={key}
                onClick={() => setSelectedAttack(key)}
                disabled={isAttacking}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedAttack === key
                    ? `border-${attack.color}-400 bg-${attack.color}-900/30 text-${attack.color}-200`
                    : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
                } ${isAttacking ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{attack.icon}</div>
                  <span className="font-bold text-lg">{attack.name}</span>
                </div>
                <div className="text-sm space-y-1 text-left">
                  <div className="font-mono">IP: {attack.attackerIP}</div>
                  <div className="font-mono">Puerto: {attack.port}</div>
                  <div className="font-mono">Método: {attack.method}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {attack.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Controles de Visualización */}
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Eye className="w-6 h-6 text-purple-400" />
            Modo de Visualización
          </h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('2d')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === '2d' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🎯 2D Clásico
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === '3d' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🚀 3D Avanzado
              </button>
              <button
                onClick={() => setViewMode('network')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === 'network' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🌐 Red Completa
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowOWASP(!showOWASP)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  showOWASP 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🛡️ OWASP Top 10
              </button>
            </div>
          </div>
        </div>

        {/* OWASP Top 10 */}
        {showOWASP && (
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <OWASPAttacks 
              onAttackSelect={setSelectedAttack}
              selectedAttack={selectedAttack}
            />
          </div>
        )}

        {/* Visualización de Ataque */}
        <div className="relative h-96 bg-gradient-to-r from-slate-800 to-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden">
          {/* Efectos de Audio */}
          <AudioEffects 
            isAttacking={isAttacking}
            attackType={selectedAttack}
            mitigationActive={mitigationActive}
            attackResult={attackResult}
          />
          
          {/* Modo 2D Clásico */}
          {viewMode === '2d' && (
            <AttackEffects 
              isAttacking={isAttacking}
              attackStep={attackStep}
              mitigationActive={mitigationActive}
              attackResult={attackResult}
              attackType={selectedAttack}
            />
          )}
          
          {/* Modo 3D Avanzado */}
          {viewMode === '3d' && (
            <Attack3DEffects 
              isAttacking={isAttacking}
              attackType={selectedAttack}
              mitigationActive={mitigationActive}
              attackResult={attackResult}
            />
          )}
          
          {/* Modo Red Completa */}
          {viewMode === 'network' && (
            <NetworkVisualization 
              isAttacking={isAttacking}
              attackType={selectedAttack}
              attackStep={attackStep}
              mitigationActive={mitigationActive}
              attackResult={attackResult}
            />
          )}
          {/* Atacante (Izquierda) */}
          <animated.div
            style={attackerAnimation}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className="text-center">
              {/* Icono de Hacker */}
              <div className={`relative mb-4 ${
                isAttacking ? 'animate-bounce' : ''
              }`}>
                <div className="text-8xl">
                  {config.icon}
                </div>
                {isAttacking && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                )}
                {isAttacking && (
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                )}
              </div>
              
              {/* Información del Hacker */}
              <div className={`bg-${config.color}-900 border-2 border-${config.color}-400 rounded-lg p-4 shadow-lg min-w-[200px]`}>
                <div className="text-center mb-3">
                  <span className="text-lg font-bold text-white">HACKER</span>
                  {isAttacking && (
                    <div className="flex justify-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-300 space-y-2">
                  <div className="font-mono">IP: {config.attackerIP}</div>
                  <div className="font-mono">Port: {config.port}</div>
                  <div className={`text-${config.color}-400 font-bold`}>
                    Status: {isAttacking ? 'ATTACKING' : 'STANDBY'}
                  </div>
                  {isAttacking && (
                    <div className="text-xs text-red-300 animate-pulse">
                      {config.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </animated.div>

          {/* Flujo de Red */}
          <animated.div
            style={networkFlowAnimation}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <div className="text-xs text-red-400 text-center mt-2 font-mono">
              {config.payload}
            </div>
          </animated.div>

          {/* Servidor Objetivo (Derecha) */}
          <animated.div
            style={targetAnimation}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className={`border-2 rounded-lg p-6 shadow-lg ${
              mitigationActive 
                ? 'bg-green-900 border-green-400 animate-pulse' 
                : attackResult === 'success'
                ? 'bg-red-900 border-red-400 animate-pulse'
                : 'bg-gray-800 border-gray-400'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Server className="w-8 h-8 text-blue-400" />
                  {mitigationActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  )}
                  {attackResult === 'success' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className="text-lg font-bold text-blue-200">SERVIDOR</span>
                {mitigationActive && (
                  <div className="flex gap-1">
                    <Shield className="w-4 h-4 text-green-400 animate-bounce" />
                    <Shield className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="font-mono">IP: {config.targetIP}</div>
                <div className="font-mono">Port: {config.port}</div>
                <div className={`font-bold ${
                  mitigationActive 
                    ? 'text-green-400' 
                    : attackResult === 'success'
                    ? 'text-red-400'
                    : 'text-yellow-400'
                }`}>
                  Status: {mitigationActive ? 'PROTECTED' : attackResult === 'success' ? 'COMPROMISED' : 'VULNERABLE'}
                </div>
                {mitigationActive && (
                  <div className="text-xs text-green-300 animate-pulse">
                    🛡️ Defendiendo...
                  </div>
                )}
                {attackResult === 'success' && (
                  <div className="text-xs text-red-300 animate-pulse">
                    💥 Sistema comprometido
                  </div>
                )}
              </div>
            </div>
          </animated.div>

          {/* Explosión */}
          {showExplosion && (
            <animated.div
              style={explosionAnimation}
              className="absolute right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            </animated.div>
          )}

          {/* Líneas de Conexión */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
            <div className="w-64 h-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 opacity-50" />
          </div>
        </div>

        {/* Logs de Red */}
        <div className="bg-black/50 border border-gray-600 rounded-lg p-6 h-40 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <Network className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-200">Network Logs</span>
          </div>
          <div className="space-y-2 text-sm font-mono">
            {networkLogs.map((log, index) => (
              <div key={index} className="text-gray-300">
                {log}
              </div>
            ))}
            {isAttacking && (
              <div className="text-red-400 animate-pulse">
                {generateNetworkLog(attackStep)}
              </div>
            )}
          </div>
        </div>

        {/* Información del Ataque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-900/30 border border-red-400 rounded-lg p-6">
            <h4 className="font-bold text-red-200 mb-4 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              Atacante
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <div className="font-mono">IP: {config.attackerIP}</div>
              <div className="font-mono">Método: {config.method}</div>
              <div className="font-mono">Payload: {config.payload}</div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-400 rounded-lg p-6">
            <h4 className="font-bold text-blue-200 mb-4 flex items-center gap-3">
              <Server className="w-6 h-6" />
              Objetivo
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <div className="font-mono">IP: {config.targetIP}</div>
              <div className="font-mono">Puerto: {config.port}</div>
              <div className="font-mono">Servicio: {config.name}</div>
            </div>
          </div>

          <div className="bg-green-900/30 border border-green-400 rounded-lg p-6">
            <h4 className="font-bold text-green-200 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Defensa
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <div className="font-mono">Firewall: Activo</div>
              <div className="font-mono">IDS: Monitoreando</div>
              <div className="font-mono">Status: {mitigationActive ? 'Bloqueado' : 'Vulnerable'}</div>
            </div>
          </div>
        </div>

        {/* Resultado del Ataque - Ataque Bloqueado */}
        {mitigationActive && (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-green-900/50 to-green-800/30 border-2 border-green-400 rounded-lg">
              <div className="text-center">
                <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-green-200 mb-1 text-xl">
                  🛡️ ATAQUE BLOQUEADO
                </h4>
                <p className="text-sm text-green-300 mb-3">
                  El sistema de defensa detectó y neutralizó la amenaza
                </p>
                <Badge className="bg-green-500 text-white px-3 py-1">
                  🎯 95% Efectividad de Defensa
                </Badge>
              </div>
            </div>

            {/* Estadísticas de Defensa */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-700 text-center">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-sm text-gray-300">Efectividad</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700 text-center">
                <div className="text-2xl font-bold text-blue-400">2.3s</div>
                <div className="text-sm text-gray-300">Tiempo de Respuesta</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700 text-center">
                <div className="text-2xl font-bold text-purple-400">1,247</div>
                <div className="text-sm text-gray-300">Paquetes Analizados</div>
              </div>
            </div>

            {/* Recomendaciones de Seguridad */}
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
              <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                ✅ Medidas de Seguridad Activas
              </h5>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>• Firewall configurado correctamente</div>
                <div>• IDS detectando amenazas</div>
                <div>• Monitoreo en tiempo real</div>
                <div>• Logs de seguridad actualizados</div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setIsAttacking(false);
                  setAttackStep(0);
                  setMitigationActive(false);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                🔄 Simular Otro Ataque
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                ✅ Cerrar Simulador
              </button>
            </div>
          </div>
        )}

        {/* Ataque Exitoso */}
        {attackResult === 'success' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-red-900/50 to-red-800/30 border-2 border-red-400 rounded-lg">
              <div className="text-center">
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-2 animate-pulse" />
                <h4 className="font-bold text-red-200 mb-1 text-xl">
                  💀 SISTEMA COMPROMETIDO
                </h4>
                <p className="text-sm text-red-300 mb-3">
                  El ataque fue exitoso - se requieren medidas inmediatas
                </p>
                <Badge className="bg-red-500 text-white px-3 py-1">
                  ⚠️ Acción Inmediata Requerida
                </Badge>
              </div>
            </div>

            {/* Estadísticas del Ataque */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-red-900/30 rounded-lg border border-red-700 text-center">
                <div className="text-2xl font-bold text-red-400">0%</div>
                <div className="text-sm text-gray-300">Efectividad de Defensa</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-700 text-center">
                <div className="text-2xl font-bold text-orange-400">4.7s</div>
                <div className="text-sm text-gray-300">Tiempo de Compromiso</div>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-700 text-center">
                <div className="text-2xl font-bold text-yellow-400">2,891</div>
                <div className="text-sm text-gray-300">Paquetes Maliciosos</div>
              </div>
            </div>

            {/* Acciones de Emergencia */}
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-600">
              <h5 className="font-semibold text-red-200 mb-2 flex items-center gap-2">
                🚨 Acciones de Emergencia Requeridas
              </h5>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>• Aislar el sistema inmediatamente</div>
                <div>• Revisar logs de seguridad</div>
                <div>• Actualizar reglas de firewall</div>
                <div>• Implementar monitoreo adicional</div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setIsAttacking(false);
                  setAttackStep(0);
                  setAttackResult(null);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                🔄 Simular Otro Ataque
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                ✅ Cerrar Simulador
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AttackSimulator;