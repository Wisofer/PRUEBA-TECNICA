import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Iniciando aplicación...');
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const loadingSteps = [
    { text: 'Iniciando aplicación...', progress: 20 },
    { text: 'Cargando componentes...', progress: 40 },
    { text: 'Preparando dashboard...', progress: 60 },
    { text: 'Optimizando rendimiento...', progress: 80 },
    { text: '¡Listo para comenzar!', progress: 100 }
  ];

  // Animación de la barra de progreso
  const progressSpring = useSpring({
    width: `${progress}%`,
    config: { tension: 100, friction: 50 }
  });

  useEffect(() => {
    // Mostrar contenido después de 0.5s
    setTimeout(() => setShowContent(true), 500);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < loadingSteps.length) {
        setLoadingText(loadingSteps[stepIndex].text);
        setProgress(loadingSteps[stepIndex].progress);
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-blue-900 dark:to-blue-800 flex items-center justify-center z-50 overflow-hidden">
      {/* Fondo con ondas sutiles */}
      <div className="absolute inset-0">
        {/* Ondas de fondo animadas */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-400/5 dark:from-blue-600/10 dark:via-transparent dark:to-blue-400/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Partículas flotantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 dark:bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Líneas de luz horizontales */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 dark:via-blue-400/30 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/15 dark:via-blue-300/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      {/* Contenido principal con efecto de entrada tipo Netflix */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-20 text-center px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* GIF de BDG con efecto de zoom suave - Responsivo */}
            <motion.div
              className="mb-8 sm:mb-12 lg:mb-16"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/BDG.gif" 
                  alt="BDG - Empresa de Desarrollo" 
                  className="h-48 w-auto mx-auto drop-shadow-2xl sm:h-56 md:h-64 lg:h-72 xl:h-80"
                  title="BDG - Empresa de Desarrollo de Software"
                />
                
                {/* Efecto de resplandor sutil */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-600/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Texto de carga con efecto de escritura - Responsivo */}
            <motion.div
              className="mb-8 sm:mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 min-h-[1.5rem] sm:min-h-[2rem] tracking-wide px-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  {loadingText}
                </motion.div>
              </AnimatePresence>
              
              {/* Barra de progreso estilo Netflix - Responsivo */}
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 mx-auto px-4">
                <div className="relative">
                  {/* Fondo de la barra */}
                  <div className="w-full h-1 bg-gray-300 dark:bg-white/20 rounded-full overflow-hidden">
                    {/* Barra de progreso */}
                    <animated.div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative"
                      style={progressSpring}
                    >
                      {/* Efecto de brillo que se mueve */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </animated.div>
                  </div>
                  
                  {/* Porcentaje - Responsivo */}
                  <motion.div
                    className="text-center mt-4 sm:mt-6"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-gray-800 dark:text-white font-light text-lg sm:text-xl md:text-2xl tracking-wider">
                      {progress}%
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Información corporativa con efecto de fade-in - Responsivo */}
            <motion.div
              className="space-y-2 sm:space-y-3 lg:space-y-4 px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white tracking-wider"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.6)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                BDG
              </motion.h1>
              
              <motion.p
                className="text-gray-600 dark:text-white/80 text-base sm:text-lg md:text-xl font-light tracking-wide"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Empresa de Desarrollo
              </motion.p>
              
              <motion.p
                className="text-gray-500 dark:text-white/60 text-sm sm:text-base md:text-lg font-light tracking-wider"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Prueba Técnica - William
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efectos de luz adicionales */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/40 via-transparent to-transparent"></div>
    </div>
  );
};

export default Loader;
