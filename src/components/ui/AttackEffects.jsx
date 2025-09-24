import React, { useState, useEffect } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { Rocket, Zap, Bomb, Flame, Shield, Target, ArrowRight, Circle } from 'lucide-react';

const AttackEffects = ({ isAttacking, attackStep, mitigationActive, attackResult, attackType }) => {
  const [missiles, setMissiles] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [shields, setShields] = useState([]);
  const [particles, setParticles] = useState([]);
  const [ddosPackets, setDdosPackets] = useState([]);
  const [phishingEmails, setPhishingEmails] = useState([]);
  const [malwareFiles, setMalwareFiles] = useState([]);
  const [bruteForceAttempts, setBruteForceAttempts] = useState([]);
  const [mitmInterceptions, setMitmInterceptions] = useState([]);

  // Generar efectos específicos por tipo de ataque
  useEffect(() => {
    if (isAttacking) {
      let interval;
      
      switch (attackType) {
        case 'ddos':
          // DDoS: Múltiples paquetes simultáneos
          interval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
              const newPacket = {
                id: Date.now() + Math.random() + i,
                x: 15,
                y: 40 + Math.random() * 30,
                targetX: 85,
                targetY: 40 + Math.random() * 30,
                progress: 0,
                type: 'packet'
              };
              setDdosPackets(prev => [...prev, newPacket]);
            }
          }, 200);
          break;
          
        case 'phishing':
          // Phishing: Emails que vuelan
          interval = setInterval(() => {
            const newEmail = {
              id: Date.now() + Math.random(),
              x: 15,
              y: 45 + Math.random() * 20,
              targetX: 85,
              targetY: 45 + Math.random() * 20,
              progress: 0,
              type: 'email'
            };
            setPhishingEmails(prev => [...prev, newEmail]);
          }, 1500);
          break;
          
        case 'malware':
          // Malware: Archivos maliciosos
          interval = setInterval(() => {
            const newFile = {
              id: Date.now() + Math.random(),
              x: 15,
              y: 45 + Math.random() * 20,
              targetX: 85,
              targetY: 45 + Math.random() * 20,
              progress: 0,
              type: 'malware'
            };
            setMalwareFiles(prev => [...prev, newFile]);
          }, 1000);
          break;
          
        case 'bruteforce':
          // Brute Force: Intentos de login
          interval = setInterval(() => {
            const newAttempt = {
              id: Date.now() + Math.random(),
              x: 15,
              y: 45 + Math.random() * 20,
              targetX: 85,
              targetY: 45 + Math.random() * 20,
              progress: 0,
              type: 'attempt'
            };
            setBruteForceAttempts(prev => [...prev, newAttempt]);
          }, 300);
          break;
          
        case 'mitm':
          // Man-in-the-Middle: Intercepciones
          interval = setInterval(() => {
            const newInterception = {
              id: Date.now() + Math.random(),
              x: 15,
              y: 45 + Math.random() * 20,
              targetX: 85,
              targetY: 45 + Math.random() * 20,
              progress: 0,
              type: 'interception'
            };
            setMitmInterceptions(prev => [...prev, newInterception]);
          }, 800);
          break;
          
        default:
          // Ataque genérico con misiles
          interval = setInterval(() => {
            const newMissile = {
              id: Date.now() + Math.random(),
              x: 15,
              y: 45 + Math.random() * 20,
              targetX: 85,
              targetY: 45 + Math.random() * 20,
              type: Math.random() > 0.5 ? 'rocket' : 'bomb',
              progress: 0
            };
            setMissiles(prev => [...prev, newMissile]);
          }, 800);
      }

      return () => clearInterval(interval);
    } else {
      // Limpiar todos los efectos
      setMissiles([]);
      setDdosPackets([]);
      setPhishingEmails([]);
      setMalwareFiles([]);
      setBruteForceAttempts([]);
      setMitmInterceptions([]);
    }
  }, [isAttacking, attackType]);

  // Animar todos los tipos de ataques
  useEffect(() => {
    const animateAttacks = (attacks, setAttacks, speed = 0.02) => {
      if (attacks.length > 0) {
        const interval = setInterval(() => {
          setAttacks(prev => prev.map(attack => {
            const newProgress = attack.progress + speed;
            if (newProgress >= 1) {
              // Crear explosión
              const explosion = {
                id: Date.now() + Math.random(),
                x: attack.targetX,
                y: attack.targetY,
                size: Math.random() * 15 + 10
              };
              setExplosions(prev => [...prev, explosion]);
              return null; // Eliminar ataque
            }
            return { ...attack, progress: newProgress };
          }).filter(Boolean));
        }, 50);

        return () => clearInterval(interval);
      }
    };

    // Animar cada tipo de ataque con diferentes velocidades
    const intervals = [
      animateAttacks(missiles, setMissiles, 0.02),
      animateAttacks(ddosPackets, setDdosPackets, 0.05), // DDoS más rápido
      animateAttacks(phishingEmails, setPhishingEmails, 0.015), // Phishing más lento
      animateAttacks(malwareFiles, setMalwareFiles, 0.025),
      animateAttacks(bruteForceAttempts, setBruteForceAttempts, 0.04), // Brute force rápido
      animateAttacks(mitmInterceptions, setMitmInterceptions, 0.02)
    ];

    return () => intervals.forEach(clearInterval => clearInterval?.());
  }, [missiles, ddosPackets, phishingEmails, malwareFiles, bruteForceAttempts, mitmInterceptions]);

  // Generar partículas de fondo
  useEffect(() => {
    if (isAttacking) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: 15 + Math.random() * 70,
          y: 40 + Math.random() * 30,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1
        };
        setParticles(prev => [...prev, newParticle]);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isAttacking]);

  // Animar partículas
  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles(prev => prev.map(particle => {
          const newX = particle.x + particle.vx;
          const newY = particle.y + particle.vy;
          const newLife = particle.life - 0.01;
          
          if (newLife <= 0) return null;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            life: newLife
          };
        }).filter(Boolean));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [particles]);

  // Generar escudos cuando se activa la mitigación
  useEffect(() => {
    if (mitigationActive) {
      const newShield = {
        id: Date.now() + Math.random(),
        x: 85,
        y: 50,
        size: 20
      };
      setShields(prev => [...prev, newShield]);
    }
  }, [mitigationActive]);

  // Limpiar explosiones después de un tiempo
  useEffect(() => {
    if (explosions.length > 0) {
      const timer = setTimeout(() => {
        setExplosions(prev => prev.slice(1));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [explosions]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* DDoS Packets */}
      {ddosPackets.map((packet) => {
        const currentX = packet.x + (packet.targetX - packet.x) * packet.progress;
        const currentY = packet.y + (packet.targetY - packet.y) * packet.progress;
        
        return (
          <div
            key={packet.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
            </div>
          </div>
        );
      })}

      {/* Phishing Emails */}
      {phishingEmails.map((email) => {
        const currentX = email.x + (email.targetX - email.x) * email.progress;
        const currentY = email.y + (email.targetY - email.y) * email.progress;
        
        return (
          <div
            key={email.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">📧</div>
              <div className="w-10 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
            </div>
          </div>
        );
      })}

      {/* Malware Files */}
      {malwareFiles.map((file) => {
        const currentX = file.x + (file.targetX - file.x) * file.progress;
        const currentY = file.y + (file.targetY - file.y) * file.progress;
        
        return (
          <div
            key={file.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">🦠</div>
              <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        );
      })}

      {/* Brute Force Attempts */}
      {bruteForceAttempts.map((attempt) => {
        const currentX = attempt.x + (attempt.targetX - attempt.x) * attempt.progress;
        const currentY = attempt.y + (attempt.targetY - attempt.y) * attempt.progress;
        
        return (
          <div
            key={attempt.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">💥</div>
              <div className="w-10 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
            </div>
          </div>
        );
      })}

      {/* MITM Interceptions */}
      {mitmInterceptions.map((interception) => {
        const currentX = interception.x + (interception.targetX - interception.x) * interception.progress;
        const currentY = interception.y + (interception.targetY - interception.y) * interception.progress;
        
        return (
          <div
            key={interception.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">🕵️</div>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
            </div>
          </div>
        );
      })}

      {/* Misiles Genéricos */}
      {missiles.map((missile) => {
        const currentX = missile.x + (missile.targetX - missile.x) * missile.progress;
        const currentY = missile.y + (missile.targetY - missile.y) * missile.progress;
        
        return (
          <div
            key={missile.id}
            className="absolute z-30"
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-2">
              {missile.type === 'rocket' ? (
                <div className="flex items-center gap-1">
                  <Rocket className="w-6 h-6 text-red-500 animate-pulse" />
                  <div className="w-12 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-transparent rounded-full" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Bomb className="w-6 h-6 text-orange-500 animate-pulse" />
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-transparent rounded-full" />
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Explosiones */}
      {explosions.map((explosion) => (
        <div
          key={explosion.id}
          className="absolute z-40"
          style={{
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-red-500 rounded-full animate-ping" />
            <div className="absolute inset-0 w-16 h-16 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
            <div className="absolute inset-0 w-16 h-16 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-0 w-16 h-16 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">💥</span>
            </div>
          </div>
        </div>
      ))}

      {/* Escudos Defensivos */}
      {shields.map((shield) => (
        <div
          key={shield.id}
          className="absolute z-35"
          style={{
            left: `${shield.x}%`,
            top: `${shield.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            <Shield className="w-12 h-12 text-green-400 animate-pulse" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-green-300 rounded-full animate-ping" />
            <div className="absolute inset-0 w-12 h-12 border border-green-200 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      ))}

      {/* Partículas de Fondo */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-red-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.life,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Líneas de Conexión */}
      {isAttacking && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-80 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 opacity-30 animate-pulse" />
          <div className="w-80 h-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      )}

      {/* Efectos de Impacto en el Servidor */}
      {attackResult === 'success' && (
        <div className="absolute right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="relative">
            <div className="w-20 h-20 bg-red-500 rounded-full animate-ping" />
            <div className="absolute inset-0 w-20 h-20 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
            <div className="absolute inset-0 w-20 h-20 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-0 w-20 h-20 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">💀</span>
            </div>
          </div>
        </div>
      )}

      {/* Efectos de Defensa Exitosa */}
      {mitigationActive && (
        <div className="absolute right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="relative">
            <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-0 w-16 h-16 bg-green-100 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        </div>
      )}

      {/* Red de Conexiones */}
      {isAttacking && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${40 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttackEffects;

// CSS para animaciones personalizadas
const styles = `
  @keyframes float {
    0% { transform: translateY(0px) translateX(0px); opacity: 1; }
    50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
    100% { transform: translateY(0px) translateX(20px); opacity: 0; }
  }
  
  @keyframes missile {
    0% { transform: translateX(0px) scale(1); opacity: 1; }
    50% { transform: translateX(50px) scale(1.2); opacity: 0.8; }
    100% { transform: translateX(100px) scale(0.8); opacity: 0; }
  }
  
  @keyframes explosion {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
    100% { transform: scale(2) rotate(360deg); opacity: 0; }
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
