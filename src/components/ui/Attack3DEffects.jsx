import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Attack3DEffects = ({ 
  isAttacking, 
  attackType, 
  mitigationActive, 
  attackResult 
}) => {
  const mountRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Geometrías
    const createAttacker = () => {
      const group = new THREE.Group();
      
      // Cuerpo del atacante (cubo rojo)
      const bodyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0;
      body.castShadow = true;
      group.add(body);

      // Ojos (esferas rojas)
      const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.15, 0.1, 0.3);
      rightEye.position.set(0.15, 0.1, 0.3);
      group.add(leftEye);
      group.add(rightEye);

      // Antenas (cilindros)
      const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
      const antennaMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
      const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      leftAntenna.position.set(-0.2, 0.4, 0);
      rightAntenna.position.set(0.2, 0.4, 0);
      group.add(leftAntenna);
      group.add(rightAntenna);

      return group;
    };

    const createServer = () => {
      const group = new THREE.Group();
      
      // Servidor principal
      const serverGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.4);
      const serverMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const server = new THREE.Mesh(serverGeometry, serverMaterial);
      server.position.y = 0;
      server.castShadow = true;
      group.add(server);

      // LEDs del servidor
      const ledGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const ledMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      for (let i = 0; i < 4; i++) {
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(-0.3 + i * 0.2, 0.2, 0.25);
        group.add(led);
      }

      return group;
    };

    const createShield = () => {
      const shieldGeometry = new THREE.SphereGeometry(1.2, 16, 16);
      const shieldMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
      return shield;
    };

    const createMissile = () => {
      const group = new THREE.Group();
      
      // Cuerpo del misil
      const bodyGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.3);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff6600 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.rotation.z = Math.PI / 2;
      group.add(body);

      // Punta del misil
      const tipGeometry = new THREE.ConeGeometry(0.1, 0.2);
      const tipMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      const tip = new THREE.Mesh(tipGeometry, tipMaterial);
      tip.position.x = 0.25;
      group.add(tip);

      // Estela del misil
      const trailGeometry = new THREE.CylinderGeometry(0.02, 0.05, 0.5);
      const trailMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffaa00,
        transparent: true,
        opacity: 0.6
      });
      const trail = new THREE.Mesh(trailGeometry, trailMaterial);
      trail.position.x = -0.15;
      trail.rotation.z = Math.PI / 2;
      group.add(trail);

      return group;
    };

    // Crear objetos
    const attacker = createAttacker();
    attacker.position.set(-2, 0, 0);
    scene.add(attacker);

    const server = createServer();
    server.position.set(2, 0, 0);
    scene.add(server);

    let shield = null;
    let missiles = [];
    let particles = [];

    // Función de animación
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotar atacante
      if (isAttacking) {
        attacker.rotation.y += 0.02;
        attacker.rotation.x += 0.01;
      }

      // Efectos de ataque
      if (isAttacking && attackType === 'ddos') {
        // Crear misiles DDoS
        if (Math.random() < 0.1) {
          const missile = createMissile();
          missile.position.set(-2 + Math.random() * 0.5, Math.random() * 0.5, 0);
          scene.add(missile);
          missiles.push(missile);
        }

        // Animar misiles
        missiles.forEach((missile, index) => {
          missile.position.x += 0.1;
          missile.rotation.z += 0.1;
          
          if (missile.position.x > 3) {
            scene.remove(missile);
            missiles.splice(index, 1);
          }
        });
      }

      // Efectos de mitigación
      if (mitigationActive) {
        if (!shield) {
          shield = createShield();
          shield.position.set(2, 0, 0);
          scene.add(shield);
        }
        shield.rotation.y += 0.02;
        shield.rotation.x += 0.01;
      } else if (shield) {
        scene.remove(shield);
        shield = null;
      }

      // Partículas de fondo
      if (isAttacking) {
        if (Math.random() < 0.3) {
          const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
          const particleMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xff0000,
            transparent: true,
            opacity: 0.6
          });
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          particle.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
          scene.add(particle);
          particles.push(particle);
        }

        // Animar partículas
        particles.forEach((particle, index) => {
          particle.position.y += 0.01;
          particle.rotation.x += 0.02;
          particle.rotation.y += 0.02;
          
          if (particle.position.y > 5) {
            scene.remove(particle);
            particles.splice(index, 1);
          }
        });
      }

      // Cambiar color del servidor según el estado
      if (attackResult === 'success') {
        server.children[0].material.color.setHex(0xff0000);
      } else if (mitigationActive) {
        server.children[0].material.color.setHex(0x00ff00);
      } else {
        server.children[0].material.color.setHex(0x0066ff);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Limpiar al desmontar
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAttacking, attackType, mitigationActive, attackResult]);

  return (
    <div className="w-full h-64 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default Attack3DEffects;
