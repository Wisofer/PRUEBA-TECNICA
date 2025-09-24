import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Copy, 
  Download, 
  Users, 
  Search, 
  Image,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  FileText,
  Building,
  User,
  CreditCard,
  PiggyBank
} from 'lucide-react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { SistemaImagenes } from '../../utils/problem5';

const SimuladorIntuitivo = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [resultado, setResultado] = useState(null);
  const [ejecutando, setEjecutando] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState('Créditos');

  const sistemaImagenes = new SistemaImagenes();

  // Datos de clientes para mostrar
  const clientes = [
    {
      id: '00011134',
      nombre: 'Juan Pérez',
      expediente: 'Créditos',
      documentos: ['Cédula', 'Balance General'],
      icono: User,
      color: 'blue'
    },
    {
      id: '00011135',
      nombre: 'María García',
      expediente: 'Créditos',
      documentos: ['Cédula', 'Balance General'],
      icono: User,
      color: 'green'
    },
    {
      id: '00011136',
      nombre: 'Carlos López',
      expediente: 'Créditos',
      documentos: ['Cédula', 'Balance General'],
      icono: User,
      color: 'purple'
    },
    {
      id: '1234567890',
      nombre: 'Ana Rodríguez',
      expediente: 'Ahorros',
      documentos: ['Cédula', 'Pasaporte'],
      icono: PiggyBank,
      color: 'orange'
    },
    {
      id: '0987654321',
      nombre: 'Roberto Silva',
      expediente: 'Ahorros',
      documentos: ['Cédula', 'Pasaporte'],
      icono: PiggyBank,
      color: 'red'
    }
  ];

  const expedientes = [
    {
      nombre: 'Créditos',
      icono: CreditCard,
      color: 'blue',
      descripcion: 'Préstamos y créditos bancarios',
      clientes: clientes.filter(c => c.expediente === 'Créditos')
    },
    {
      nombre: 'Ahorros',
      icono: PiggyBank,
      color: 'green',
      descripcion: 'Cuentas de ahorro',
      clientes: clientes.filter(c => c.expediente === 'Ahorros')
    }
  ];

  const ejecutarTransaccion = async (tipo) => {
    setEjecutando(true);
    setResultado(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    let xmlResponse;
    try {
      switch (tipo) {
        case 1:
          xmlResponse = sistemaImagenes.consultarExpediente(
            expedienteSeleccionado,
            true
          );
          break;
        case 2:
          if (!clienteSeleccionado) throw new Error('Selecciona un cliente primero');
          xmlResponse = sistemaImagenes.consultarDocumentosPorLlaves(
            expedienteSeleccionado,
            {
              [expedienteSeleccionado === 'Créditos' ? 'Cliente' : 'Cuenta']: clienteSeleccionado.id,
              [expedienteSeleccionado === 'Créditos' ? 'Nombre Cliente' : 'Titular']: clienteSeleccionado.nombre
            },
            clienteSeleccionado.documentos
          );
          break;
        case 3:
          if (!clienteSeleccionado) throw new Error('Selecciona un cliente primero');
          // Obtener IDs de documentos del cliente
          const documentosCliente = sistemaImagenes.documentos.filter(doc => 
            doc.expediente === expedienteSeleccionado &&
            doc.llaves[expedienteSeleccionado === 'Créditos' ? 'Cliente' : 'Cuenta'] === clienteSeleccionado.id
          );
          const idsDocumentos = documentosCliente.map(doc => doc.id);
          
          xmlResponse = sistemaImagenes.consultarImagenesPorDocumento(
            'd:\\temp\\',
            idsDocumentos
          );
          break;
        default:
          throw new Error('Transacción no válida');
      }

      setResultado({
        tipo: 'success',
        xml: xmlResponse,
        transaccion: tipo
      });
    } catch (error) {
      setResultado({
        tipo: 'error',
        mensaje: error.message,
        transaccion: tipo
      });
    }

    setEjecutando(false);
  };

  const copiarXML = () => {
    if (resultado?.xml) {
      navigator.clipboard.writeText(resultado.xml);
    }
  };

  const descargarXML = () => {
    if (resultado?.xml) {
      const blob = new Blob([resultado.xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transaccion_${resultado.transaccion}_${Date.now()}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const pasos = [
    {
      numero: 1,
      titulo: "Selecciona un Expediente",
      descripcion: "Elige qué tipo de documentos quieres consultar",
      icono: Building
    },
    {
      numero: 2,
      titulo: "Selecciona un Cliente",
      descripcion: "Elige el cliente cuyos documentos quieres ver",
      icono: Users
    },
    {
      numero: 3,
      titulo: "Ejecuta Transacciones",
      descripcion: "Prueba las 3 consultas disponibles",
      icono: Play
    }
  ];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header compacto */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Simulador de Consultas</h3>
              <p className="text-gray-600 text-sm">Prueba la integración entre sistemas</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-xs">
              <strong>¿Qué hace?</strong> Simula cómo un CRM consulta documentos e imágenes de un sistema de archivos.
            </p>
          </div>
        </div>

        {/* Progreso de pasos compacto */}
        <div className="flex items-center justify-between">
          {pasos.map((paso, index) => {
            const Icon = paso.icono;
            const estaActivo = pasoActual === paso.numero;
            const estaCompletado = pasoActual > paso.numero;
            
            return (
              <div key={paso.numero} className="flex items-center">
                <div className={`flex items-center gap-2 p-2 rounded-lg ${
                  estaActivo ? 'bg-indigo-500 text-white' : 
                  estaCompletado ? 'bg-green-500 text-white' : 
                  'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-4 h-4" />
                  <div>
                    <div className="font-medium text-xs">{paso.titulo}</div>
                    <div className="text-xs opacity-75 hidden sm:block">{paso.descripcion}</div>
                  </div>
                </div>
                {index < pasos.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Contenido según el paso */}
        <div className="min-h-[300px]">
          {/* Paso 1: Seleccionar Expediente */}
          {pasoActual === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h4 className="text-base font-semibold text-gray-800">¿Qué tipo de documentos quieres consultar?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {expedientes.map((expediente) => {
                  const Icon = expediente.icono;
                  return (
                    <button
                      key={expediente.nombre}
                      onClick={() => {
                        setExpedienteSeleccionado(expediente.nombre);
                        setPasoActual(2);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        expedienteSeleccionado === expediente.nombre
                          ? `border-${expediente.color}-500 bg-${expediente.color}-50`
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-5 h-5 ${
                          expedienteSeleccionado === expediente.nombre 
                            ? `text-${expediente.color}-600` 
                            : 'text-gray-600'
                        }`} />
                        <span className="font-semibold text-gray-800 text-sm">{expediente.nombre}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{expediente.descripcion}</p>
                      <div className="text-xs text-gray-500">
                        {expediente.clientes.length} clientes
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Paso 2: Seleccionar Cliente */}
          {pasoActual === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-gray-800">
                  Clientes en {expedienteSeleccionado}
                </h4>
                <button
                  onClick={() => setPasoActual(1)}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  ← Cambiar
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {expedientes.find(e => e.nombre === expedienteSeleccionado)?.clientes.map((cliente) => {
                  const Icon = cliente.icono;
                  return (
                    <button
                      key={cliente.id}
                      onClick={() => {
                        setClienteSeleccionado(cliente);
                        setPasoActual(3);
                      }}
                      className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                        clienteSeleccionado?.id === cliente.id
                          ? `border-${cliente.color}-500 bg-${cliente.color}-50`
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Icon className={`w-4 h-4 ${
                          clienteSeleccionado?.id === cliente.id 
                            ? `text-${cliente.color}-600` 
                            : 'text-gray-600'
                        }`} />
                        <span className="font-medium text-gray-800 text-xs text-center">{cliente.nombre}</span>
                        <div className="text-xs text-gray-500">ID: {cliente.id}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Paso 3: Ejecutar Transacciones */}
          {pasoActual === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-gray-800">
                  Consultas para {clienteSeleccionado?.nombre}
                </h4>
                <button
                  onClick={() => setPasoActual(2)}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  ← Cambiar
                </button>
              </div>

              {/* Información del cliente seleccionado */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-800 text-sm">{clienteSeleccionado?.nombre}</span>
                  <Badge variant="primary" className="text-xs">{expedienteSeleccionado}</Badge>
                </div>
                <div className="text-xs text-gray-600">
                  Documentos: {clienteSeleccionado?.documentos.join(', ')}
                </div>
              </div>

              {/* Botones de transacciones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => ejecutarTransaccion(1)}
                  disabled={ejecutando}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800 text-sm">Consulta Expediente</span>
                  </div>
                  <p className="text-xs text-blue-700">Ver estructura y tipos</p>
                </button>

                <button
                  onClick={() => ejecutarTransaccion(2)}
                  disabled={ejecutando}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Search className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800 text-sm">Buscar Documentos</span>
                  </div>
                  <p className="text-xs text-green-700">Encontrar documentos</p>
                </button>

                <button
                  onClick={() => ejecutarTransaccion(3)}
                  disabled={ejecutando}
                  className="p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Image className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800 text-sm">Obtener Imágenes</span>
                  </div>
                  <p className="text-xs text-purple-700">Descargar fotos</p>
                </button>
              </div>

              {/* Resultado */}
              <AnimatePresence>
                {ejecutando && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      <div>
                        <div className="font-medium text-blue-800 text-sm">Procesando consulta...</div>
                        <div className="text-xs text-blue-600">Generando respuesta XML</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {resultado && !ejecutando && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`border rounded-lg p-3 ${
                      resultado.tipo === 'success' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {resultado.tipo === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`font-medium text-sm ${
                          resultado.tipo === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {resultado.tipo === 'success' ? 'Consulta Exitosa' : 'Error en Consulta'}
                        </span>
                      </div>
                      {resultado.xml && (
                        <div className="flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<Copy className="w-3 h-3" />}
                            onClick={copiarXML}
                            className="text-xs px-2 py-1"
                          >
                            Copiar
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<Download className="w-3 h-3" />}
                            onClick={descargarXML}
                            className="text-xs px-2 py-1"
                          >
                            Descargar
                          </Button>
                        </div>
                      )}
                    </div>

                    {resultado.xml && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-gray-600" />
                          <span className="text-xs font-medium text-gray-700">Respuesta XML:</span>
                        </div>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-xs max-h-40">
                          {resultado.xml}
                        </pre>
                      </div>
                    )}

                    {resultado.mensaje && (
                      <div className="text-red-700 text-xs">{resultado.mensaje}</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SimuladorIntuitivo;
