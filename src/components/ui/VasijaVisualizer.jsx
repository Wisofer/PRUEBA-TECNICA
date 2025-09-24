import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Beaker } from 'lucide-react';
import VasijaRealista from './VasijaRealista';
import TransferenciaRealista from './TransferenciaRealista';

const VasijaVisualizer = ({ estado, operacionActual = null, animando = false }) => {
  const { vasijas } = estado;
  const [transferenciaActiva, setTransferenciaActiva] = useState(false);
  const [efectosActivos, setEfectosActivos] = useState({});

  // Detectar cambios en la operación para activar animaciones
  useEffect(() => {
    if (operacionActual) {
      // Activar efectos según el tipo de operación
      const nuevosEfectos = {};
      
      if (operacionActual.tipo === 'llenar') {
        nuevosEfectos[operacionActual.destino] = 'filling';
      } else if (operacionActual.tipo === 'vaciar') {
        nuevosEfectos[operacionActual.origen] = 'emptying';
      } else if (operacionActual.tipo === 'transferir') {
        nuevosEfectos[operacionActual.origen] = 'transferring';
        nuevosEfectos[operacionActual.destino] = 'transferring';
        setTransferenciaActiva(true);
        
        // Desactivar transferencia después de la animación
        setTimeout(() => {
          setTransferenciaActiva(false);
        }, 1500);
      }
      
      setEfectosActivos(nuevosEfectos);
      
      // Limpiar efectos después de la animación
      setTimeout(() => {
        setEfectosActivos({});
      }, 2000);
    }
  }, [operacionActual]);

  // Determinar si una vasija está activa
  const isVasijaActiva = (nombre) => {
    return operacionActual && (
      operacionActual.destino === nombre || 
      operacionActual.origen === nombre
    );
  };

  // Determinar si una vasija está transfiriendo
  const isVasijaTransfiriendo = (nombre) => {
    return transferenciaActiva && operacionActual && (
      operacionActual.origen === nombre || 
      operacionActual.destino === nombre
    );
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Beaker className="w-5 h-5 text-blue-600" />
          </motion.div>
          Estado Actual de las Vasijas
        </h3>
        <p className="text-sm text-gray-600">
          {estado.toString()}
        </p>
      </motion.div>

      <div className="relative">
        <div className="flex justify-center items-end gap-8">
          <div className="relative">
            <VasijaRealista
              nombre="A"
              contenido={vasijas.A.contenido}
              capacidad={vasijas.A.capacidad}
              isActive={isVasijaActiva('A')}
              isTransferring={isVasijaTransfiriendo('A')}
              isFilling={efectosActivos.A === 'filling'}
              isEmptying={efectosActivos.A === 'emptying'}
              transferDirection={operacionActual?.tipo === 'transferir' && operacionActual?.destino === 'A' ? 'to' : null}
            />
          </div>
          
          <div className="relative">
            <VasijaRealista
              nombre="B"
              contenido={vasijas.B.contenido}
              capacidad={vasijas.B.capacidad}
              isActive={isVasijaActiva('B')}
              isTransferring={isVasijaTransfiriendo('B')}
              isFilling={efectosActivos.B === 'filling'}
              isEmptying={efectosActivos.B === 'emptying'}
              transferDirection={operacionActual?.tipo === 'transferir' && operacionActual?.destino === 'B' ? 'to' : null}
            />
          </div>
          
          <div className="relative">
            <VasijaRealista
              nombre="C"
              contenido={vasijas.C.contenido}
              capacidad={vasijas.C.capacidad}
              isActive={isVasijaActiva('C')}
              isTransferring={isVasijaTransfiriendo('C')}
              isFilling={efectosActivos.C === 'filling'}
              isEmptying={efectosActivos.C === 'emptying'}
              transferDirection={operacionActual?.tipo === 'transferir' && operacionActual?.destino === 'C' ? 'to' : null}
            />
          </div>
        </div>

        <AnimatePresence>
          {transferenciaActiva && operacionActual?.tipo === 'transferir' && (
            <TransferenciaRealista
              origen={operacionActual.origen}
              destino={operacionActual.destino}
              cantidad={operacionActual.cantidad}
              isActive={transferenciaActiva}
              onComplete={() => setTransferenciaActiva(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-6 flex justify-center items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">Transferencias permitidas:</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            B → A
          </motion.span>
          <motion.span 
            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            C → B
          </motion.span>
        </div>
      </motion.div>

      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
            estado.isVasijaALlena() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}
          animate={{
            scale: estado.isVasijaALlena() ? [1, 1.05, 1] : 1,
            boxShadow: estado.isVasijaALlena() 
              ? ['0 0 0 rgba(34, 197, 94, 0)', '0 0 20px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)']
              : '0 0 0 rgba(0, 0, 0, 0)'
          }}
          transition={{
            duration: 2,
            repeat: estado.isVasijaALlena() ? Infinity : 0,
            ease: 'easeInOut'
          }}
        >
          <motion.div 
            className={`w-2 h-2 rounded-full ${
              estado.isVasijaALlena() ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            animate={{
              scale: estado.isVasijaALlena() ? [1, 1.2, 1] : 1,
              opacity: estado.isVasijaALlena() ? [1, 0.7, 1] : 1
            }}
            transition={{
              duration: 1.5,
              repeat: estado.isVasijaALlena() ? Infinity : 0,
              ease: 'easeInOut'
            }}
          />
          <span className="text-sm font-medium">
            {estado.isVasijaALlena() ? 'Objetivo alcanzado!' : 'Objetivo: Llenar vasija A'}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VasijaVisualizer;
