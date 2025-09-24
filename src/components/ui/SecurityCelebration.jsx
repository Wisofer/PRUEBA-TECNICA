import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useSpring, animated } from '@react-spring/web';
import { Shield, CheckCircle, Star, Trophy } from 'lucide-react';

const SecurityCelebration = ({ show, onComplete, type = 'attack_prevented' }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const celebrationConfig = {
    attack_prevented: {
      title: "¡Ataque Prevenido!",
      subtitle: "Las medidas de seguridad funcionaron perfectamente",
      icon: Shield,
      color: "green",
      confettiColors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0']
    },
    security_upgrade: {
      title: "¡Seguridad Mejorada!",
      subtitle: "Nuevas medidas de protección implementadas",
      icon: CheckCircle,
      color: "blue",
      confettiColors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']
    },
    system_secure: {
      title: "¡Sistema Seguro!",
      subtitle: "Todas las vulnerabilidades han sido corregidas",
      icon: Trophy,
      color: "purple",
      confettiColors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE']
    }
  };

  const config = celebrationConfig[type] || celebrationConfig.attack_prevented;
  const Icon = config.icon;

  const animation = useSpring({
    from: { opacity: 0, scale: 0.5, transform: 'translateY(50px)' },
    to: show ? { opacity: 1, scale: 1, transform: 'translateY(0px)' } : { opacity: 0, scale: 0.5, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 20 }
  });

  const iconAnimation = useSpring({
    from: { rotate: 0, scale: 1 },
    to: show ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 },
    config: { tension: 200, friction: 10 }
  });

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Confetti */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        colors={config.confettiColors}
        numberOfPieces={200}
        recycle={false}
        run={show}
      />

      {/* Celebration Modal */}
      <animated.div
        style={animation}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border-4 border-gray-100"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <animated.div style={iconAnimation} className="mb-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
              config.color === 'green' ? 'bg-green-100' :
              config.color === 'blue' ? 'bg-blue-100' :
              'bg-purple-100'
            }`}>
              <Icon className={`w-10 h-10 ${
                config.color === 'green' ? 'text-green-600' :
                config.color === 'blue' ? 'text-blue-600' :
                'text-purple-600'
              }`} />
            </div>
          </animated.div>

          {/* Title */}
          <h2 className={`text-2xl font-bold mb-2 ${
            config.color === 'green' ? 'text-green-800' :
            config.color === 'blue' ? 'text-blue-800' :
            'text-purple-800'
          }`}>
            {config.title}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            {config.subtitle}
          </p>

          {/* Stars Animation */}
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <animated.div
                key={star}
                style={{
                  animationDelay: `${star * 0.1}s`,
                  animation: show ? 'bounce 1s infinite' : 'none'
                }}
                className="text-yellow-400"
              >
                <Star className="w-6 h-6 fill-current" />
              </animated.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-gray-800">Efectividad</div>
              <div className={`text-lg font-bold ${
                config.color === 'green' ? 'text-green-600' :
                config.color === 'blue' ? 'text-blue-600' :
                'text-purple-600'
              }`}>
                95%
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-gray-800">Tiempo</div>
              <div className={`text-lg font-bold ${
                config.color === 'green' ? 'text-green-600' :
                config.color === 'blue' ? 'text-blue-600' :
                'text-purple-600'
              }`}>
                0.3s
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  config.color === 'green' ? 'bg-green-500' :
                  config.color === 'blue' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`}
                style={{ width: '100%' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Protección activa al 100%
            </p>
          </div>
        </div>
      </animated.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
    </div>
  );
};

export default SecurityCelebration;
