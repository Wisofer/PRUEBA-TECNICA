import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Clock, Users, Database, Lock } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

const SecuritySummary = () => {
  const [summaryData, setSummaryData] = useState({
    overallScore: 94,
    threatsBlocked: 1247,
    responseTime: 0.3,
    uptime: 99.9,
    lastIncident: '2 horas',
    securityLevel: 'Alto',
    recommendations: 3
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setSummaryData(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 5),
        overallScore: Math.max(90, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 2))
      }));
      setTimeout(() => setIsAnimating(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scoreAnimation = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 300, friction: 20 }
  });

  const pulseAnimation = useSpring({
    scale: isAnimating ? 1.05 : 1,
    config: { tension: 200, friction: 10 }
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const securityMetrics = [
    {
      icon: Shield,
      title: 'Puntuación General',
      value: `${summaryData.overallScore}%`,
      color: getScoreColor(summaryData.overallScore),
      bgColor: getScoreBgColor(summaryData.overallScore),
      trend: '+2%',
      trendColor: 'text-green-600'
    },
    {
      icon: CheckCircle,
      title: 'Amenazas Bloqueadas',
      value: summaryData.threatsBlocked.toLocaleString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12',
      trendColor: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Tiempo de Respuesta',
      value: `${summaryData.responseTime}s`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '-0.1s',
      trendColor: 'text-green-600'
    },
    {
      icon: Database,
      title: 'Disponibilidad',
      value: `${summaryData.uptime}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+0.1%',
      trendColor: 'text-green-600'
    }
  ];

  const recommendations = [
    {
      priority: 'Alta',
      title: 'Implementar autenticación multifactor',
      description: 'Añadir MFA para todos los usuarios administrativos',
      impact: 'Reduce riesgo de acceso no autorizado en 95%'
    },
    {
      priority: 'Media',
      title: 'Actualizar políticas de validación',
      description: 'Revisar y fortalecer validaciones de entrada',
      impact: 'Mejora detección de ataques de inyección'
    },
    {
      priority: 'Baja',
      title: 'Optimizar logging de seguridad',
      description: 'Implementar análisis de patrones en logs',
      impact: 'Facilita detección temprana de amenazas'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header con Score Principal */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Resumen Ejecutivo de Seguridad
            </h2>
            <p className="text-gray-600">
              Estado actual del sistema de seguridad y métricas clave
            </p>
          </div>
          <animated.div
            style={pulseAnimation}
            className={`p-6 rounded-full ${getScoreBgColor(summaryData.overallScore)}`}
          >
            <animated.div style={scoreAnimation}>
              <div className={`text-4xl font-bold ${getScoreColor(summaryData.overallScore)}`}>
                {summaryData.overallScore}
              </div>
              <div className="text-sm text-gray-600 text-center">Puntuación</div>
            </animated.div>
          </animated.div>
        </div>
      </Card>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <animated.div key={index} style={pulseAnimation}>
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">{metric.title}</div>
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className={`text-xs ${metric.trendColor} flex items-center gap-1`}>
                      <TrendingUp className="w-3 h-3" />
                      {metric.trend}
                    </div>
                  </div>
                </div>
              </Card>
            </animated.div>
          );
        })}
      </div>

      {/* Estado del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Estado del Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nivel de Seguridad</span>
              <Badge className="bg-green-100 text-green-800">
                {summaryData.securityLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Último Incidente</span>
              <span className="text-sm font-medium text-gray-800">
                Hace {summaryData.lastIncident}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Recomendaciones Pendientes</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                {summaryData.recommendations}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sistema Activo</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-600">Operacional</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recomendaciones Prioritarias
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">{rec.title}</h4>
                  <Badge className={`text-xs ${
                    rec.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                <p className="text-xs text-green-600 font-medium">{rec.impact}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Gráfico de Tendencias */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Tendencias de Seguridad (Últimas 24 horas)
        </h3>
        <div className="h-32 flex items-end justify-between space-x-1">
          {Array.from({ length: 24 }, (_, i) => {
            const height = Math.random() * 80 + 20;
            const isRecent = i >= 20;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-500 ${
                  isRecent ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Últimas 4 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Histórico</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySummary;
