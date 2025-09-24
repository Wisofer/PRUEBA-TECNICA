import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkVisualization = ({ 
  isAttacking, 
  attackType, 
  attackStep, 
  mitigationActive, 
  attackResult 
}) => {
  const svgRef = useRef();
  const networkDataRef = useRef();

  // Configuración de la red
  const networkConfig = {
    width: 800,
    height: 400,
    nodeRadius: 20,
    linkDistance: 150,
    chargeStrength: -300
  };

  // Datos de la red
  const networkData = {
    nodes: [
      { id: 'attacker', name: 'Atacante', type: 'attacker', x: 100, y: 200, status: 'active' },
      { id: 'firewall', name: 'Firewall', type: 'firewall', x: 300, y: 200, status: 'neutral' },
      { id: 'ids', name: 'IDS', type: 'ids', x: 400, y: 150, status: 'neutral' },
      { id: 'server', name: 'Servidor', type: 'server', x: 600, y: 200, status: 'neutral' },
      { id: 'database', name: 'Base de Datos', type: 'database', x: 700, y: 300, status: 'neutral' },
      { id: 'router1', name: 'Router 1', type: 'router', x: 200, y: 100, status: 'neutral' },
      { id: 'router2', name: 'Router 2', type: 'router', x: 500, y: 100, status: 'neutral' },
      { id: 'switch', name: 'Switch', type: 'switch', x: 350, y: 300, status: 'neutral' }
    ],
    links: [
      { source: 'attacker', target: 'router1' },
      { source: 'router1', target: 'firewall' },
      { source: 'firewall', target: 'ids' },
      { source: 'firewall', target: 'switch' },
      { source: 'switch', target: 'server' },
      { source: 'server', target: 'database' },
      { source: 'router2', target: 'server' },
      { source: 'ids', target: 'router2' }
    ]
  };

  // Colores y estilos por tipo de nodo
  const nodeStyles = {
    attacker: { fill: '#ef4444', stroke: '#dc2626', icon: '💀' },
    firewall: { fill: '#3b82f6', stroke: '#2563eb', icon: '🛡️' },
    ids: { fill: '#8b5cf6', stroke: '#7c3aed', icon: '👁️' },
    server: { fill: '#10b981', stroke: '#059669', icon: '🖥️' },
    database: { fill: '#f59e0b', stroke: '#d97706', icon: '🗄️' },
    router: { fill: '#6b7280', stroke: '#4b5563', icon: '📡' },
    switch: { fill: '#6366f1', stroke: '#4f46e5', icon: '🔀' }
  };

  // Estados de los nodos
  const getNodeStatus = (nodeId) => {
    if (nodeId === 'attacker') return isAttacking ? 'attacking' : 'active';
    if (nodeId === 'server') {
      if (attackResult === 'success') return 'compromised';
      if (mitigationActive) return 'protected';
      return 'vulnerable';
    }
    if (nodeId === 'firewall' || nodeId === 'ids') {
      return mitigationActive ? 'active' : 'neutral';
    }
    return 'neutral';
  };

  // Crear visualización D3
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = networkConfig.width;
    const height = networkConfig.height;

    // Crear contenedor principal
    const container = svg
      .append('g')
      .attr('transform', 'translate(0,0)');

    // Crear gradientes para efectos
    const defs = svg.append('defs');

    // Gradiente para atacante
    defs.append('radialGradient')
      .attr('id', 'attackerGradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#ef4444' },
        { offset: '100%', color: '#dc2626' }
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Gradiente para servidor comprometido
    defs.append('radialGradient')
      .attr('id', 'compromisedGradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#ef4444' },
        { offset: '100%', color: '#dc2626' }
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Crear enlaces
    const links = container
      .selectAll('.link')
      .data(networkData.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => networkData.nodes.find(n => n.id === d.source).x)
      .attr('y1', d => networkData.nodes.find(n => n.id === d.source).y)
      .attr('x2', d => networkData.nodes.find(n => n.id === d.target).x)
      .attr('y2', d => networkData.nodes.find(n => n.id === d.target).y)
      .attr('stroke', '#4b5563')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    // Crear nodos
    const nodes = container
      .selectAll('.node')
      .data(networkData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Círculos de los nodos
    nodes
      .append('circle')
      .attr('r', networkConfig.nodeRadius)
      .attr('fill', d => {
        const status = getNodeStatus(d.id);
        if (status === 'attacking') return 'url(#attackerGradient)';
        if (status === 'compromised') return 'url(#compromisedGradient)';
        if (status === 'protected') return '#10b981';
        if (status === 'active') return '#3b82f6';
        return nodeStyles[d.type].fill;
      })
      .attr('stroke', d => {
        const status = getNodeStatus(d.id);
        if (status === 'attacking') return '#dc2626';
        if (status === 'compromised') return '#dc2626';
        if (status === 'protected') return '#059669';
        if (status === 'active') return '#2563eb';
        return nodeStyles[d.type].stroke;
      })
      .attr('stroke-width', 3)
      .style('filter', d => {
        const status = getNodeStatus(d.id);
        if (status === 'attacking' || status === 'compromised') {
          return 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))';
        }
        if (status === 'protected' || status === 'active') {
          return 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))';
        }
        return 'none';
      });

    // Iconos de los nodos
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '16px')
      .text(d => nodeStyles[d.type].icon);

    // Etiquetas de los nodos
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2.5em')
      .attr('font-size', '12px')
      .attr('fill', '#e5e7eb')
      .text(d => d.name);

    // Estados de los nodos
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '4em')
      .attr('font-size', '10px')
      .attr('fill', d => {
        const status = getNodeStatus(d.id);
        if (status === 'attacking') return '#ef4444';
        if (status === 'compromised') return '#ef4444';
        if (status === 'protected') return '#10b981';
        if (status === 'active') return '#3b82f6';
        return '#9ca3af';
      })
      .text(d => {
        const status = getNodeStatus(d.id);
        switch (status) {
          case 'attacking': return 'ATACANDO';
          case 'compromised': return 'COMPROMETIDO';
          case 'protected': return 'PROTEGIDO';
          case 'active': return 'ACTIVO';
          default: return 'NEUTRAL';
        }
      });

    // Animaciones de ataque
    if (isAttacking) {
      // Partículas de ataque
      const attackParticles = container
        .selectAll('.attack-particle')
        .data(Array.from({ length: 20 }, (_, i) => i))
        .enter()
        .append('circle')
        .attr('class', 'attack-particle')
        .attr('r', 3)
        .attr('fill', '#ef4444')
        .attr('opacity', 0.8);

      // Animar partículas
      attackParticles
        .attr('cx', networkData.nodes.find(n => n.id === 'attacker').x)
        .attr('cy', networkData.nodes.find(n => n.id === 'attacker').y)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('cx', networkData.nodes.find(n => n.id === 'server').x)
        .attr('cy', networkData.nodes.find(n => n.id === 'server').y)
        .attr('opacity', 0)
        .on('end', function() {
          d3.select(this).remove();
        });

      // Pulsar nodo atacante
      d3.select(nodes.filter(d => d.id === 'attacker').node())
        .select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeSinInOut)
        .attr('r', networkConfig.nodeRadius * 1.3)
        .transition()
        .duration(500)
        .ease(d3.easeSinInOut)
        .attr('r', networkConfig.nodeRadius);
    }

    // Efectos de mitigación
    if (mitigationActive) {
      // Escudo protector
      const shield = container
        .append('circle')
        .attr('cx', networkData.nodes.find(n => n.id === 'server').x)
        .attr('cy', networkData.nodes.find(n => n.id === 'server').y)
        .attr('r', networkConfig.nodeRadius + 10)
        .attr('fill', 'none')
        .attr('stroke', '#10b981')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.8);

      // Animar escudo
      shield
        .transition()
        .duration(1000)
        .ease(d3.easeSinInOut)
        .attr('r', networkConfig.nodeRadius + 20)
        .attr('opacity', 0)
        .on('end', function() {
          d3.select(this).remove();
        });
    }

  }, [isAttacking, attackType, attackStep, mitigationActive, attackResult]);

  return (
    <div className="w-full h-96 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${networkConfig.width} ${networkConfig.height}`}
        className="w-full h-full"
      />
    </div>
  );
};

export default NetworkVisualization;
