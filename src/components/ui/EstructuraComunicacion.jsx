import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Server, 
  Database, 
  Shield, 
  Clock, 
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Settings,
  Users,
  Globe,
  Lock,
  Activity
} from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import { estructuraComunicacion } from '../../utils/problem5';

const EstructuraComunicacion = () => {
  const [componenteActivo, setComponenteActivo] = useState(0);
  const [pasoActivo, setPasoActivo] = useState(0);

  const iconosComponentes = {
    'CRM System': Users,
    'API Gateway': Shield,
    'Sistema de Imágenes': Database
  };

  const iconosFlujo = [
    Globe,
    ArrowRight,
    Server,
    ArrowRight,
    Database,
    ArrowRight,
    Globe
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Network className="w-8 h-8 text-indigo-600" />
            Estructura de Comunicación
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Arquitectura de comunicación entre el sistema CRM y el sistema administrador de imágenes, 
            incluyendo componentes, flujos y consideraciones técnicas.
          </p>
        </div>

        {/* Arquitectura General */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Arquitectura del Sistema
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="font-medium text-blue-800 mb-1">Tipo</div>
              <div className="text-sm text-blue-600">{estructuraComunicacion.arquitectura.tipo}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="font-medium text-blue-800 mb-1">Patrón</div>
              <div className="text-sm text-blue-600">{estructuraComunicacion.arquitectura.patron}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="font-medium text-blue-800 mb-1">Protocolo</div>
              <div className="text-sm text-blue-600">{estructuraComunicacion.arquitectura.protocolo}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="font-medium text-blue-800 mb-1">Formato</div>
              <div className="text-sm text-blue-600">{estructuraComunicacion.arquitectura.formato}</div>
            </div>
          </div>
        </div>

        {/* Componentes del Sistema */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Componentes del Sistema
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {estructuraComunicacion.componentes.map((componente, index) => {
              const Icon = iconosComponentes[componente.nombre];
              return (
                <motion.div
                  key={componente.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    componenteActivo === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setComponenteActivo(index)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      componenteActivo === index ? 'bg-indigo-500' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        componenteActivo === index ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${
                        componenteActivo === index ? 'text-indigo-800' : 'text-gray-800'
                      }`}>
                        {componente.nombre}
                      </div>
                      <div className={`text-sm ${
                        componenteActivo === index ? 'text-indigo-600' : 'text-gray-600'
                      }`}>
                        {componente.rol}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {componente.responsabilidades.map((responsabilidad, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`text-sm ${
                          componenteActivo === index ? 'text-indigo-700' : 'text-gray-600'
                        }`}>
                          {responsabilidad}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Flujo de Comunicación */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Flujo de Comunicación
          </h4>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setPasoActivo(Math.max(0, pasoActivo - 1))}
                disabled={pasoActivo === 0}
                className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                ← Anterior
              </button>
              <span className="text-sm text-gray-600">
                Paso {pasoActivo + 1} de {estructuraComunicacion.flujoComunicacion.length}
              </span>
              <button
                onClick={() => setPasoActivo(Math.min(estructuraComunicacion.flujoComunicacion.length - 1, pasoActivo + 1))}
                disabled={pasoActivo === estructuraComunicacion.flujoComunicacion.length - 1}
                className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente →
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              {estructuraComunicacion.flujoComunicacion.map((paso, index) => {
                const Icon = iconosFlujo[index] || ArrowRight;
                return (
                  <React.Fragment key={index}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: pasoActivo === index ? 1.1 : 1,
                        opacity: pasoActivo >= index ? 1 : 0.5
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg ${
                        pasoActivo === index 
                          ? 'bg-indigo-500 text-white' 
                          : pasoActivo > index 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium text-center max-w-[80px]">
                        {paso}
                      </span>
                    </motion.div>
                    {index < estructuraComunicacion.flujoComunicacion.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <motion.div
              key={pasoActivo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="font-medium text-gray-800 mb-2">
                {estructuraComunicacion.flujoComunicacion[pasoActivo]}
              </div>
              <div className="text-sm text-gray-600">
                {pasoActivo === 0 && "El sistema CRM genera una solicitud XML con los parámetros requeridos para la transacción específica."}
                {pasoActivo === 1 && "La solicitud se envía al API Gateway que actúa como intermediario entre el CRM y el sistema de imágenes."}
                {pasoActivo === 2 && "El API Gateway valida la autenticación, aplica rate limiting y registra la transacción en logs."}
                {pasoActivo === 3 && "La solicitud validada se enruta al sistema de imágenes para procesamiento."}
                {pasoActivo === 4 && "El sistema de imágenes procesa la transacción, consulta la base de datos y genera la respuesta XML."}
                {pasoActivo === 5 && "La respuesta XML se retorna al API Gateway con los datos solicitados."}
                {pasoActivo === 6 && "El CRM recibe y procesa la respuesta XML, actualizando su cache local si es necesario."}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Consideraciones Técnicas */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Consideraciones Técnicas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {estructuraComunicacion.consideracionesTecnicas.map((consideracion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{consideracion}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Beneficios de la Arquitectura */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Beneficios de la Arquitectura
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="font-medium text-green-800 mb-2">🔒 Seguridad</div>
              <div className="text-sm text-green-700">
                Autenticación centralizada, validación de entrada y auditoría completa
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="font-medium text-green-800 mb-2">⚡ Performance</div>
              <div className="text-sm text-green-700">
                Cache inteligente, balanceo de carga y optimización de recursos
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="font-medium text-green-800 mb-2">📈 Escalabilidad</div>
              <div className="text-sm text-green-700">
                Arquitectura de microservicios con capacidad de crecimiento horizontal
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EstructuraComunicacion;
