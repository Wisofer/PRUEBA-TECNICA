import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { TrendingUp, TrendingDown, Activity, Shield, AlertTriangle } from 'lucide-react';
import Card from './Card';

const SecurityCharts = () => {
  const [chartData, setChartData] = useState({
    attacksOverTime: [
      { day: 'Lun', attacks: 12, blocked: 11 },
      { day: 'Mar', attacks: 18, blocked: 17 },
      { day: 'Mié', attacks: 15, blocked: 14 },
      { day: 'Jue', attacks: 22, blocked: 20 },
      { day: 'Vie', attacks: 25, blocked: 23 },
      { day: 'Sáb', attacks: 8, blocked: 8 },
      { day: 'Dom', attacks: 5, blocked: 5 }
    ],
    threatTypes: [
      { type: 'Inyección SQL', count: 45, percentage: 35 },
      { type: 'Bypass de Validación', count: 32, percentage: 25 },
      { type: 'Acceso No Autorizado', count: 28, percentage: 22 },
      { type: 'Ataques DDoS', count: 15, percentage: 12 },
      { type: 'Otros', count: 8, percentage: 6 }
    ],
    securityTrend: [
      { month: 'Ene', score: 78 },
      { month: 'Feb', score: 82 },
      { month: 'Mar', score: 85 },
      { month: 'Abr', score: 88 },
      { month: 'May', score: 91 },
      { month: 'Jun', score: 94 }
    ]
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      // Simular actualización de datos
      setChartData(prev => ({
        ...prev,
        attacksOverTime: prev.attacksOverTime.map(day => ({
          ...day,
          attacks: day.attacks + Math.floor(Math.random() * 3),
          blocked: day.blocked + Math.floor(Math.random() * 2)
        }))
      }));
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxAttacks = Math.max(...chartData.attacksOverTime.map(d => d.attacks));

  const barAnimation = useSpring({
    from: { scaleY: 0 },
    to: { scaleY: 1 },
    config: { tension: 300, friction: 20 }
  });

  const lineAnimation = useSpring({
    from: { pathLength: 0 },
    to: { pathLength: 1 },
    config: { tension: 200, friction: 20 }
  });

  return (
    <div className="space-y-6">
      {/* Ataques por Día */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Ataques por Día (Última Semana)
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Ataques</span>
            <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
            <span>Bloqueados</span>
          </div>
        </div>

        <div className="flex items-end justify-between h-48 space-x-2">
          {chartData.attacksOverTime.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div className="flex flex-col items-center space-y-1 mb-2">
                <animated.div
                  className="w-full bg-red-500 rounded-t"
                  style={{
                    height: `${(day.attacks / maxAttacks) * 120}px`,
                    transform: barAnimation.scaleY.to(s => `scaleY(${s})`),
                    transformOrigin: 'bottom'
                  }}
                />
                <animated.div
                  className="w-full bg-green-500 rounded-t"
                  style={{
                    height: `${(day.blocked / maxAttacks) * 120}px`,
                    transform: barAnimation.scaleY.to(s => `scaleY(${s})`),
                    transformOrigin: 'bottom'
                  }}
                />
              </div>
              <div className="text-xs text-gray-600 font-medium">{day.day}</div>
              <div className="text-xs text-gray-500">
                {day.attacks}/{day.blocked}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tipos de Amenazas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Distribución de Amenazas
        </h3>

        <div className="space-y-4">
          {chartData.threatTypes.map((threat, index) => (
            <div key={threat.type} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{threat.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{threat.count} ataques</span>
                  <span className="text-sm font-bold text-gray-800">{threat.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <animated.div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: `${threat.percentage}%`,
                    transform: isAnimating ? 'scaleX(1.05)' : 'scaleX(1)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tendencia de Seguridad */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Tendencia de Seguridad (6 Meses)
        </h3>

        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="securityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={200 - (y * 1.6)}
                x2="400"
                y2={200 - (y * 1.6)}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}

            {/* Area under curve */}
            <animated.path
              d={`M 0,${200 - (chartData.securityTrend[0].score * 1.6)} ${chartData.securityTrend.map((point, index) => 
                `L ${(index * 400) / (chartData.securityTrend.length - 1)},${200 - (point.score * 1.6)}`
              ).join(' ')} L 400,200 L 0,200 Z`}
              fill="url(#securityGradient)"
              style={{
                pathLength: lineAnimation.pathLength
              }}
            />

            {/* Line */}
            <animated.path
              d={`M 0,${200 - (chartData.securityTrend[0].score * 1.6)} ${chartData.securityTrend.map((point, index) => 
                `L ${(index * 400) / (chartData.securityTrend.length - 1)},${200 - (point.score * 1.6)}`
              ).join(' ')}`}
              stroke="#10B981"
              strokeWidth="3"
              fill="none"
              style={{
                pathLength: lineAnimation.pathLength
              }}
            />

            {/* Data points */}
            {chartData.securityTrend.map((point, index) => (
              <animated.circle
                key={index}
                cx={(index * 400) / (chartData.securityTrend.length - 1)}
                cy={200 - (point.score * 1.6)}
                r="4"
                fill="#10B981"
                style={{
                  opacity: lineAnimation.pathLength.to(p => p > index / chartData.securityTrend.length ? 1 : 0)
                }}
              />
            ))}
          </svg>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            {chartData.securityTrend.map((point, index) => (
              <span key={index}>{point.month}</span>
            ))}
          </div>
        </div>

        {/* Current score */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Puntuación Actual:</span>
            <span className="text-lg font-bold text-green-600">
              {chartData.securityTrend[chartData.securityTrend.length - 1].score}
            </span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+16 puntos</span>
          </div>
        </div>
      </Card>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Efectividad</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0.3s</div>
              <div className="text-sm text-gray-600">Tiempo Respuesta</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">+12%</div>
              <div className="text-sm text-gray-600">Mejora Mensual</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityCharts;
