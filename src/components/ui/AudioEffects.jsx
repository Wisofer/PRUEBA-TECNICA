import React, { useRef, useEffect } from 'react';

const AudioEffects = ({ 
  isAttacking, 
  attackType, 
  mitigationActive, 
  attackResult 
}) => {
  const audioContextRef = useRef();
  const gainNodeRef = useRef();
  const oscillatorsRef = useRef([]);

  // Inicializar Web Audio API
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.3; // Volumen general
    } catch (error) {
      console.warn('Web Audio API no soportada:', error);
    }
  }, []);

  // Crear sonidos de ataque
  const createAttackSound = (type) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(gainNodeRef.current);

    switch (type) {
      case 'ddos':
        // Sonido de sobrecarga - tono bajo y distorsionado
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(30, audioContextRef.current.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.5);
        break;

      case 'phishing':
        // Sonido de email - tono medio con modulación
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContextRef.current.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.3);
        break;

      case 'malware':
        // Sonido de virus - tono alto y agresivo
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.4);
        break;

      case 'bruteforce':
        // Sonido de fuerza bruta - ráfagas cortas
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.6, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.1);
        break;

      case 'mitm':
        // Sonido de interceptación - tono medio con eco
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContextRef.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContextRef.current.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.6);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.6);
        break;

      default:
        // Sonido genérico de ataque
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContextRef.current.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.3);
    }

    oscillatorsRef.current.push(oscillator);
  };

  // Crear sonido de mitigación
  const createMitigationSound = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(gainNodeRef.current);

    // Sonido de escudo - tono alto y limpio
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);

    oscillatorsRef.current.push(oscillator);
  };

  // Crear sonido de éxito/fallo
  const createResultSound = (success) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(gainNodeRef.current);

    if (success) {
      // Sonido de éxito - acorde mayor
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContextRef.current.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContextRef.current.currentTime + 0.3); // E5
      oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContextRef.current.currentTime + 0.6); // G5
      gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.8);
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.8);
    } else {
      // Sonido de fallo - acorde menor
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, audioContextRef.current.currentTime); // A3
      oscillator.frequency.exponentialRampToValueAtTime(196, audioContextRef.current.currentTime + 0.4); // G3
      oscillator.frequency.exponentialRampToValueAtTime(174.61, audioContextRef.current.currentTime + 0.8); // F3
      gainNode.gain.setValueAtTime(0.6, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 1.0);
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 1.0);
    }

    oscillatorsRef.current.push(oscillator);
  };

  // Efectos de sonido según el estado
  useEffect(() => {
    if (isAttacking) {
      createAttackSound(attackType);
    }
  }, [isAttacking, attackType]);

  useEffect(() => {
    if (mitigationActive) {
      createMitigationSound();
    }
  }, [mitigationActive]);

  useEffect(() => {
    if (attackResult === 'success') {
      createResultSound(false);
    } else if (attackResult === 'prevented') {
      createResultSound(true);
    }
  }, [attackResult]);

  // Limpiar osciladores
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(oscillator => {
        try {
          oscillator.stop();
        } catch (error) {
          // Ignorar errores de osciladores ya detenidos
        }
      });
      oscillatorsRef.current = [];
    };
  }, []);

  // Limpiar contexto de audio
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // Este componente no renderiza nada visual
};

export default AudioEffects;
