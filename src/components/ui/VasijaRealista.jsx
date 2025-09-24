import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de vasija con animaciones realistas de agua usando Framer Motion
 */
const VasijaRealista = ({ 
  nombre, 
  contenido, 
  capacidad, 
  isActive = false, 
  isTransferring = false,
  transferDirection = null,
  isFilling = false,
  isEmptying = false
}) => {
  const porcentajeLlenado = capacidad > 0 ? (contenido / capacidad) * 100 : 0;
  const alturaLiquido = `${Math.max(0, Math.min(100, porcentajeLlenado))}%`;

  // Colores dinámicos basados en el estado
  const getLiquidColor = () => {
    if (isTransferring) return '#3B82F6'; // Azul brillante durante transferencia
    if (isFilling) return '#10B981'; // Verde durante llenado
    if (isEmptying) return '#EF4444'; // Rojo durante vaciado
    if (isActive) return '#06B6D4'; // Cyan cuando está activa
    return '#0EA5E9'; // Azul por defecto
  };

  // Animaciones de la vasija
  const vasijaVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    },
    active: {
      scale: 1.05,
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    transferring: {
      scale: 1.02,
      boxShadow: '0 8px 20px -4px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  // Animaciones del líquido
  const liquidVariants = {
    idle: {
      height: alturaLiquido,
      backgroundColor: getLiquidColor(),
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    filling: {
      height: alturaLiquido,
      backgroundColor: '#10B981',
      transition: { duration: 1.2, ease: 'easeOut' }
    },
    emptying: {
      height: alturaLiquido,
      backgroundColor: '#EF4444',
      transition: { duration: 0.6, ease: 'easeIn' }
    },
    transferring: {
      height: alturaLiquido,
      backgroundColor: '#3B82F6',
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  // Efectos de ondas en el líquido
  const waveVariants = {
    idle: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    },
    active: {
      opacity: 0.6,
      scale: 1.1,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  // Animación de burbujas durante transferencia
  const bubbleVariants = {
    idle: {
      opacity: 0,
      y: 0,
      scale: 0
    },
    transferring: {
      opacity: [0, 1, 0],
      y: [-20, -40],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Efectos de llenado con gotas cayendo
  const dropletVariants = {
    idle: {
      opacity: 0,
      scale: 0,
      y: -50
    },
    filling: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-50, 0],
      transition: {
        duration: 1,
        ease: 'easeIn'
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Contenedor de la vasija */}
      <motion.div
        className="relative w-24 h-32 bg-white border-4 border-gray-300 rounded-b-lg overflow-hidden"
        variants={vasijaVariants}
        initial="idle"
        animate={
          isTransferring ? 'transferring' : 
          isActive ? 'active' : 'idle'
        }
      >
        {/* Líquido animado */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 origin-bottom"
          variants={liquidVariants}
          initial="idle"
          animate={
            isTransferring ? 'transferring' : 
            isFilling ? 'filling' :
            isEmptying ? 'emptying' : 'idle'
          }
          style={{
            height: alturaLiquido,
            backgroundColor: getLiquidColor()
          }}
        >
          {/* Efecto de ondas */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-30"
            variants={waveVariants}
            initial="idle"
            animate={isActive ? 'active' : 'idle'}
          />
          
          {/* Burbujas durante transferencia */}
          {isTransferring && (
            <>
              <motion.div
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{ left: '20%', bottom: '20%' }}
                variants={bubbleVariants}
                initial="idle"
                animate="transferring"
              />
              <motion.div
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                style={{ left: '60%', bottom: '30%' }}
                variants={bubbleVariants}
                initial="idle"
                animate="transferring"
                transition={{ delay: 0.3 }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ left: '40%', bottom: '40%' }}
                variants={bubbleVariants}
                initial="idle"
                animate="transferring"
                transition={{ delay: 0.6 }}
              />
            </>
          )}
        </motion.div>

        {/* Gotas cayendo durante llenado */}
        {isFilling && (
          <>
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`droplet-${index}`}
                className="absolute w-2 h-3 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + index * 15}%`,
                  top: '10%'
                }}
                variants={dropletVariants}
                initial="idle"
                animate="filling"
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </>
        )}

        {/* Indicador de transferencia */}
        {isTransferring && transferDirection && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-500"
              animate={{
                y: [0, -5, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Información de la vasija */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm font-medium text-gray-800">
          Vasija {nombre}
        </div>
        <div className="text-xs text-gray-600">
          {contenido}/{capacidad} galones
        </div>
        <motion.div
          className="text-xs font-bold"
          animate={{
            color: isActive ? '#10B981' : isTransferring ? '#3B82F6' : '#6B7280'
          }}
        >
          {Math.round(porcentajeLlenado)}%
        </motion.div>
      </motion.div>

      {/* Efecto de resplandor cuando está activa */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export default VasijaRealista;
