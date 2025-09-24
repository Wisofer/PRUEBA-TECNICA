import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, Database, Play } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import AttackSimulator from './AttackSimulator';
import SecurityCelebration from './SecurityCelebration';

const AnalisisRiesgos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('seguridad');
  const [activeTab, setActiveTab] = useState('riesgos');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState('attack_prevented');

  // Documentación de decisiones de mitigación
  const decisionesMitigacion = {
    "Validación estricta de entrada": {
      razon: "Prevenir inyección de datos maliciosos y ataques de manipulación",
      implementacion: "Whitelist de caracteres permitidos, validación de tipos de datos",
      impacto: "Reduce riesgo de seguridad en 90% según estudios de OWASP"
    },
    "Control de acceso basado en roles": {
      razon: "Limitar acceso a configuraciones críticas solo a personal autorizado",
      implementacion: "RBAC con permisos granulares, autenticación multifactor",
      impacto: "Previene 95% de accesos no autorizados"
    },
    "Auditoría de cambios de configuración": {
      razon: "Rastrear quién, cuándo y qué cambios se realizan en el sistema",
      implementacion: "Logs inmutables, notificaciones automáticas, versionado",
      impacto: "Facilita detección de cambios maliciosos y recuperación"
    },
    "Rate limiting": {
      razon: "Prevenir sobrecarga del sistema y ataques de denegación de servicio",
      implementacion: "Límites por IP, usuario y endpoint, backoff exponencial",
      impacto: "Mantiene disponibilidad del sistema bajo carga alta"
    }
  };

  const categoriasRiesgos = [
    {
      key: 'seguridad',
      label: 'Seguridad',
      icon: Shield,
      color: 'red',
      riesgos: [
        {
          riesgo: 'Inyección de Datos Maliciosos',
          descripcion: 'Clientes pueden ingresar datos maliciosos para comprometer el sistema',
          impacto: 'Alto',
          probabilidad: 'Media',
          mitigaciones: [
            'Validación estricta de entrada de datos',
            'Sanitización de inputs',
            'Implementar whitelist de caracteres permitidos',
            'Logging de intentos sospechosos'
          ]
        },
        {
          riesgo: 'Bypass de Validaciones',
          descripcion: 'Manipulación de configuraciones para evadir validaciones de seguridad',
          impacto: 'Crítico',
          probabilidad: 'Baja',
          mitigaciones: [
            'Control de acceso basado en roles',
            'Auditoría de cambios de configuración',
            'Validación de permisos en cada operación',
            'Monitoreo en tiempo real'
          ]
        },
        {
          riesgo: 'Acceso No Autorizado',
          descripcion: 'Acceso a configuraciones o datos sin autorización',
          impacto: 'Alto',
          probabilidad: 'Media',
          mitigaciones: [
            'Autenticación multifactor',
            'Encriptación de datos sensibles',
            'Sesiones con timeout automático',
            'Logging de accesos'
          ]
        }
      ]
    },
    {
      key: 'configuracion',
      label: 'Configuración',
      icon: Database,
      color: 'orange',
      riesgos: [
        {
          riesgo: 'Configuraciones Inseguras',
          descripcion: 'Configuración incorrecta que permite acceso no autorizado',
          impacto: 'Alto',
          probabilidad: 'Media',
          mitigaciones: [
            'Validación automática de configuraciones',
            'Plantillas predefinidas seguras',
            'Revisión de configuraciones por expertos',
            'Testing automatizado de configuraciones'
          ]
        },
        {
          riesgo: 'Pérdida de Configuraciones',
          descripcion: 'Pérdida de configuraciones críticas por fallos del sistema',
          impacto: 'Medio',
          probabilidad: 'Baja',
          mitigaciones: [
            'Backup automático de configuraciones',
            'Versionado de configuraciones',
            'Replicación en múltiples servidores',
            'Procedimientos de recuperación'
          ]
        }
      ]
    },
    {
      key: 'operacional',
      label: 'Operacional',
      icon: AlertTriangle,
      color: 'yellow',
      riesgos: [
        {
          riesgo: 'Sobrecarga del Sistema',
          descripcion: 'Alto volumen de validaciones puede saturar el sistema',
          impacto: 'Medio',
          probabilidad: 'Media',
          mitigaciones: [
            'Implementar rate limiting',
            'Escalabilidad horizontal',
            'Cache de configuraciones',
            'Monitoreo de performance'
          ]
        },
        {
          riesgo: 'Falsos Positivos/Negativos',
          descripcion: 'Validaciones incorrectas que afectan la experiencia del cliente',
          impacto: 'Medio',
          probabilidad: 'Media',
          mitigaciones: [
            'Testing exhaustivo de validaciones',
            'Machine learning para mejorar precisión',
            'Proceso de apelación para clientes',
            'Métricas de precisión'
          ]
        }
      ]
    }
  ];

  const getImpactoColor = (impacto) => {
    switch (impacto) {
      case 'Crítico': return 'bg-red-100 text-red-800';
      case 'Alto': return 'bg-orange-100 text-orange-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilidadColor = (probabilidad) => {
    switch (probabilidad) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categoriaActual = categoriasRiesgos.find(c => c.key === categoriaSeleccionada);

  const handleAttackPrevented = (tipoAtaque) => {
    setCelebrationType('attack_prevented');
    setShowCelebration(true);
  };

  const handleAttackSuccess = (tipoAtaque) => {
    setCelebrationType('system_secure');
    setShowCelebration(true);
  };

  const tabs = [
    { key: 'riesgos', label: 'Análisis de Riesgos', icon: Shield },
    { key: 'simulador', label: 'Simulador de Ataques', icon: Play }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-lg">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Análisis de Riesgos y Mitigaciones
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                  activeTab === tab.key
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Content based on active tab */}
      {activeTab === 'riesgos' && (
        <Card className="p-6">
          <div className="space-y-6">
        {/* Navegación de categorías */}
        <div className="flex gap-2 flex-wrap">
          {categoriasRiesgos.map((categoria) => {
            const Icon = categoria.icon;
            return (
              <button
                key={categoria.key}
                onClick={() => setCategoriaSeleccionada(categoria.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  categoriaSeleccionada === categoria.key
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {categoria.label}
              </button>
            );
          })}
        </div>

        {/* Contenido de la categoría seleccionada */}
        {categoriaActual && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <categoriaActual.icon className="w-5 h-5 text-red-600" />
              <h4 className="text-lg font-semibold text-gray-800">
                Riesgos de {categoriaActual.label}
              </h4>
            </div>

            {categoriaActual.riesgos.map((riesgo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800 mb-2">{riesgo.riesgo}</h5>
                    <p className="text-sm text-gray-600 mb-3">{riesgo.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getImpactoColor(riesgo.impacto)} size="sm">
                      Impacto: {riesgo.impacto}
                    </Badge>
                    <Badge className={getProbabilidadColor(riesgo.probabilidad)} size="sm">
                      Prob: {riesgo.probabilidad}
                    </Badge>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h6 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Estrategias de Mitigación
                  </h6>
                  <ul className="space-y-1">
                    {riesgo.mitigaciones.map((mitigacion, mitIndex) => (
                      <li key={mitIndex} className="text-sm text-green-700 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {mitigacion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumen de mitigaciones generales */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Medidas de Seguridad Generales
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-700 mb-2">🔐 Autenticación y Autorización</h5>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Autenticación multifactor obligatoria</li>
                <li>• Control de acceso basado en roles (RBAC)</li>
                <li>• Principio de menor privilegio</li>
                <li>• Rotación regular de credenciales</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-700 mb-2">📊 Monitoreo y Auditoría</h5>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Logging completo de todas las operaciones</li>
                <li>• Alertas en tiempo real</li>
                <li>• Análisis de patrones sospechosos</li>
                <li>• Reportes de seguridad regulares</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recomendaciones finales */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Recomendaciones de Implementación
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h5 className="font-medium text-purple-700 mb-1">Fase de Diseño</h5>
              <p className="text-sm text-purple-600">Implementar seguridad desde el diseño inicial</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h5 className="font-medium text-purple-700 mb-1">Testing Continuo</h5>
              <p className="text-sm text-purple-600">Pruebas de seguridad automatizadas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h5 className="font-medium text-purple-700 mb-1">Monitoreo Activo</h5>
              <p className="text-sm text-purple-600">Supervisión continua del sistema</p>
            </div>
          </div>
        </div>

        {/* Documentación de Decisiones de Mitigación */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Documentación de Decisiones de Mitigación
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(decisionesMitigacion).map(([mitigacion, info]) => (
              <div key={mitigacion} className="bg-white rounded-lg p-3 border border-blue-100">
                <h5 className="font-medium text-blue-800 mb-2">{mitigacion}</h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 font-medium">Razón:</span>
                    <p className="text-gray-700">{info.razon}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Implementación:</span>
                    <p className="text-gray-700">{info.implementacion}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Impacto:</span>
                    <p className="text-gray-700">{info.impacto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </div>
        </Card>
      )}

      {/* Simulador de Ataques */}
      {activeTab === 'simulador' && (
        <div className="space-y-6">
          <AttackSimulator 
            onAttackPrevented={handleAttackPrevented}
            onAttackSuccess={handleAttackSuccess}
            onClose={() => {}} // No hay modal que cerrar, es solo una función vacía
          />
        </div>
      )}


      {/* Celebration Modal */}
      <SecurityCelebration 
        show={showCelebration}
        type={celebrationType}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
};

export default AnalisisRiesgos;
