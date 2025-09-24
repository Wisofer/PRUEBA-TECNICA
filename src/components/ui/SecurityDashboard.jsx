import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Activity, Lock, Eye, BarChart3 } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import SecurityCharts from './SecurityCharts';

const SecurityDashboard = () => {
  const [metrics, setMetrics] = useState({
    attacksBlocked: 0,
    attacksDetected: 0,
    securityScore: 85,
    activeThreats: 0,
    systemHealth: 95
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Simular métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        attacksBlocked: prev.attacksBlocked + Math.floor(Math.random() * 3),
        attacksDetected: prev.attacksDetected + Math.floor(Math.random() * 2),
        securityScore: Math.max(70, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 5)),
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : 0)),
        systemHealth: Math.max(80, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 3))
      }));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animaciones
  const numberAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 20 }
  });

  const pulseAnimation = useSpring({
    scale: isAnimating ? 1.05 : 1,
    config: { tension: 200, friction: 10 }
  });

  const getHealthColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Dashboard de Seguridad en Tiempo Real
            </h3>
            <p className="text-sm text-gray-600">
              Monitoreo activo de amenazas y métricas de seguridad
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Sistema Activo
          </Badge>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ataques Bloqueados */}
          <animated.div style={pulseAnimation} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">
                +{Math.floor(Math.random() * 5)}
              </Badge>
            </div>
            <animated.div style={numberAnimation}>
              <div className="text-2xl font-bold text-blue-800">
                {metrics.attacksBlocked.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Ataques Bloqueados</div>
            </animated.div>
          </animated.div>

          {/* Ataques Detectados */}
          <animated.div style={pulseAnimation} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800">
                +{Math.floor(Math.random() * 3)}
              </Badge>
            </div>
            <animated.div style={numberAnimation}>
              <div className="text-2xl font-bold text-orange-800">
                {metrics.attacksDetected.toLocaleString()}
              </div>
              <div className="text-sm text-orange-600">Ataques Detectados</div>
            </animated.div>
          </animated.div>

          {/* Puntuación de Seguridad */}
          <animated.div style={pulseAnimation} className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <animated.div style={numberAnimation}>
              <div className={`text-2xl font-bold ${getHealthColor(metrics.securityScore)}`}>
                {Math.round(metrics.securityScore)}
              </div>
              <div className="text-sm text-green-600">Puntuación de Seguridad</div>
            </animated.div>
          </animated.div>

          {/* Amenazas Activas */}
          <animated.div style={pulseAnimation} className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-6 h-6 text-red-600" />
              {metrics.activeThreats > 0 && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <animated.div style={numberAnimation}>
              <div className="text-2xl font-bold text-red-800">
                {metrics.activeThreats}
              </div>
              <div className="text-sm text-red-600">Amenazas Activas</div>
            </animated.div>
          </animated.div>
        </div>

        {/* Gráfico de Salud del Sistema */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Salud del Sistema
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Seguridad General</span>
              <span className={`text-sm font-medium ${getHealthColor(metrics.securityScore)}`}>
                {Math.round(metrics.securityScore)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <animated.div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  metrics.securityScore >= 90 ? 'bg-green-500' :
                  metrics.securityScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{
                  width: `${metrics.securityScore}%`
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Salud del Sistema</span>
              <span className={`text-sm font-medium ${getHealthColor(metrics.systemHealth)}`}>
                {Math.round(metrics.systemHealth)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <animated.div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  metrics.systemHealth >= 90 ? 'bg-green-500' :
                  metrics.systemHealth >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{
                  width: `${metrics.systemHealth}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Alertas Recientes */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alertas Recientes
          </h4>
          <div className="space-y-2">
            {[
              { type: 'success', message: 'Ataque de inyección SQL bloqueado', time: '2 min ago' },
              { type: 'warning', message: 'Múltiples intentos de acceso detectados', time: '5 min ago' },
              { type: 'info', message: 'Sistema de validación actualizado', time: '10 min ago' },
              { type: 'success', message: 'Configuración de seguridad verificada', time: '15 min ago' }
            ].map((alert, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                alert.type === 'success' ? 'bg-green-50 border-green-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className={`p-1 rounded-full ${
                  alert.type === 'success' ? 'bg-green-100' :
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos de Seguridad */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Análisis Detallado</h3>
        </div>
        <SecurityCharts />
      </div>
    </Card>
  );
};

export default SecurityDashboard;
