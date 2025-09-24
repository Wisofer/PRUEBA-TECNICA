import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente para animar transferencias realistas de agua entre vasijas
 */
const TransferenciaRealista = ({ 
  origen, 
  destino, 
  cantidad, 
  isActive = false,
  onComplete = () => {}
}) => {
  // Posiciones relativas de las vasijas (A, B, C)
  const posiciones = {
    A: { x: 0, y: 0 },
    B: { x: 120, y: 0 },
    C: { x: 240, y: 0 }
  };

  const posicionOrigen = posiciones[origen];
  const posicionDestino = posiciones[destino];

  // Animación del líquido que se transfiere
  const liquidStreamVariants = {
    idle: {
      opacity: 0,
      scale: 0,
      x: posicionOrigen.x,
      y: posicionOrigen.y
    },
    transferring: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      x: [posicionOrigen.x, posicionDestino.x],
      y: [posicionOrigen.y, posicionDestino.y],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        times: [0, 0.3, 0.7, 1]
      }
    }
  };

  // Animación de la flecha de transferencia
  const arrowVariants = {
    idle: {
      opacity: 0,
      scale: 0,
      x: (posicionOrigen.x + posicionDestino.x) / 2,
      y: (posicionOrigen.y + posicionDestino.y) / 2 - 20
    },
    transferring: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      x: (posicionOrigen.x + posicionDestino.x) / 2,
      y: (posicionOrigen.y + posicionDestino.y) / 2 - 20,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1]
      }
    }
  };

  // Animación de partículas de agua
  const particleVariants = {
    idle: {
      opacity: 0,
      scale: 0
    },
    transferring: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [
        posicionOrigen.x,
        posicionOrigen.x + (posicionDestino.x - posicionOrigen.x) * 0.3,
        posicionDestino.x
      ],
      y: [
        posicionOrigen.y,
        posicionOrigen.y - 30,
        posicionDestino.y
      ],
      transition: {
        duration: 1.2,
        ease: 'easeInOut'
      }
    }
  };

  // Efecto de ondas en la vasija destino
  const rippleVariants = {
    idle: {
      scale: 0,
      opacity: 0
    },
    transferring: {
      scale: [0, 1.5, 0],
      opacity: [0, 0.6, 0],
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 1.2
      }
    }
  };

  // Animación de gotas de agua cayendo
  const waterDropsVariants = {
    idle: {
      opacity: 0,
      scale: 0,
      y: 0
    },
    transferring: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -40],
      transition: {
        duration: 1.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="relative w-full h-32">
      <AnimatePresence>
        {isActive && (
          <>
            {/* Flujo principal de líquido */}
            <motion.div
              className="absolute w-8 h-8 bg-blue-400 rounded-full"
              style={{
                left: posicionOrigen.x,
                top: posicionOrigen.y,
                background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
              variants={liquidStreamVariants}
              initial="idle"
              animate="transferring"
              onAnimationComplete={onComplete}
            />

            {/* Partículas adicionales de agua */}
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`particle-${index}`}
                className="absolute w-2 h-2 bg-blue-300 rounded-full"
                style={{
                  left: posicionOrigen.x + (index - 2) * 8,
                  top: posicionOrigen.y + (index - 2) * 3
                }}
                variants={particleVariants}
                initial="idle"
                animate="transferring"
                transition={{ delay: index * 0.1 }}
              />
            ))}

            {/* Gotas de agua cayendo */}
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={`drop-${index}`}
                className="absolute w-1 h-2 bg-blue-400 rounded-full"
                style={{
                  left: posicionOrigen.x + (index - 1) * 15,
                  top: posicionOrigen.y + 10
                }}
                variants={waterDropsVariants}
                initial="idle"
                animate="transferring"
                transition={{ delay: index * 0.2 }}
              />
            ))}

            {/* Flecha de transferencia */}
            <motion.div
              className="absolute"
              style={{
                left: (posicionOrigen.x + posicionDestino.x) / 2,
                top: (posicionOrigen.y + posicionDestino.y) / 2 - 20
              }}
              variants={arrowVariants}
              initial="idle"
              animate="transferring"
            >
              <motion.div
                className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-500"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Efecto de ondas en destino */}
            <motion.div
              className="absolute border-2 border-blue-400 rounded-full"
              style={{
                left: posicionDestino.x - 20,
                top: posicionDestino.y - 20,
                width: 40,
                height: 40
              }}
              variants={rippleVariants}
              initial="idle"
              animate="transferring"
            />

            {/* Texto de cantidad flotante */}
            <motion.div
              className="absolute text-sm font-bold text-blue-600 bg-white px-2 py-1 rounded shadow-lg"
              style={{
                left: (posicionOrigen.x + posicionDestino.x) / 2 - 20,
                top: (posicionOrigen.y + posicionDestino.y) / 2 + 20
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [0, -10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 0.2, 0.8, 1]
              }}
            >
              {cantidad}G
            </motion.div>

            {/* Efecto de resplandor durante transferencia */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferenciaRealista;
