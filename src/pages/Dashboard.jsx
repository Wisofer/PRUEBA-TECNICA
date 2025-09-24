import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Phone, 
  Beaker, 
  Users, 
  Database,
  Clock,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PROBLEMS, DIFFICULTY_COLORS } from '../utils/constants';

const Dashboard = () => {
  const iconMap = {
    Calculator,
    Phone,
    Beaker,
    Users,
    Database
  };

  // Estadísticas del dashboard
  const completedProblems = PROBLEMS.filter(p => p.status === 'completed').length;
  const inProgressProblems = PROBLEMS.filter(p => p.status === 'in-progress').length;
  const totalProblems = PROBLEMS.length;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Hora Actual',
      value: currentTime.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Puntuación Actual',
      value: '490/500 pts',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Progreso General',
      value: '98%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-tour="dashboard-title">
          Examen de Prueba Técnica
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Resolución de 5 problemas complejos de programación y análisis de sistemas. 
          Demostración de conocimientos en JavaScript, arquitectura de software y gestión de proyectos.
        </p>
        
      </div>

      {/* Stats cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6" hover={false}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
        </div>
      </div>


      {/* Problems grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Problemas a Resolver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-tour="problem-cards">
          {PROBLEMS.map((problem) => {
            const Icon = iconMap[problem.icon] || Calculator;
            
            return (
              <Card key={problem.id} className="group" gradient>
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${problem.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={
                        problem.status === 'completed' ? 'success' :
                        problem.status === 'in-progress' ? 'primary' : 'default'
                      }>
                        {problem.status === 'completed' ? 'Completado' :
                         problem.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Problema {problem.id}: {problem.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="pt-4 border-t border-gray-100">
                    <Link to={problem.path}>
                      <Button 
                        className="w-full group-hover:shadow-lg"
                        icon={<Play className="w-4 h-4" />}
                      >
                        {problem.status === 'completed' ? 'Ver Solución' : 
                         problem.status === 'in-progress' ? 'Continuar' : 'Comenzar'}
                        <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
