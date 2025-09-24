import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle,
  Settings,
  TestTube,
  GitBranch,
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Problem4 = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      title: "Gestión de Atrasos",
      icon: AlertTriangle,
      color: "red",
      question: "¿Qué acciones tomaría si en un proyecto están atrasados y se debe terminar con el desarrollo y certificación de la funcionalidad, pero el tiempo que se tiene es insuficiente con el equipo que se cuenta?",
      answer: "Primero, evaluaría el alcance real vs. planificado para identificar desviaciones. Luego priorizaría funcionalidades críticas usando MoSCoW (Must, Should, Could, Won't) y comunicaría transparentemente la situación al cliente. Solicitaría extensión de tiempo o reducción de alcance negociable. Implementaría trabajo en paralelo (pair programming), aumentaría recursos temporales si es posible, y establecería entregas incrementales para validar progreso continuo."
    },
    {
      id: 2,
      title: "Cambios Post-Implementación",
      icon: Settings,
      color: "orange",
      question: "Ya implementado un proyecto que se terminó con un 20% de atraso, el cliente llama e indica que necesita mejorar cierta funcionalidad. Analizando la mejora esta representa un 25% adicional; usted como gerente del proyecto que haría?",
      answer: "Evaluaría el impacto técnico y de negocio de la mejora, calculando el esfuerzo real (25% puede ser conservador). Analizaría la criticidad para el negocio del cliente y revisaría el contrato. Presentaría una propuesta formal con costos, tiempos y riesgos detallados, ofreciendo alternativas como versión simplificada o implementación por fases. Negociaría compensación adicional y establecería nuevos hitos claramente definidos."
    },
    {
      id: 3,
      title: "Pruebas de Calidad",
      icon: TestTube,
      color: "blue",
      question: "¿Qué pruebas de calidad recomendaría usted en cuanto al desarrollo de sistemas computacionales?",
      answer: "Implementaría una estrategia de pruebas en capas: pruebas unitarias con cobertura mínima del 80% para código crítico, pruebas de integración para validar interacción entre módulos, y pruebas de regresión. A nivel de sistema: pruebas de funcionalidad, rendimiento (carga y estrés), seguridad (vulnerabilidades, autenticación), y usabilidad. Para aceptación: UAT, compatibilidad multi-navegador, migración de datos, y recuperación. Finalmente, integración continua (CI/CD) con análisis estático de código y monitoreo proactivo en producción."
    },
    {
      id: 4,
      title: "Control de Versiones Multi-Cliente",
      icon: GitBranch,
      color: "green",
      question: "¿Qué metodología de trabajo recomendaría para llevar el control del manejo de versiones y control de cambios; cuando un producto lo tienen más de 10 clientes y con cada uno de ellos existen variantes en el funcionamiento?",
      answer: "Usaría versionado semántico (SemVer) con GitFlow para desarrollo paralelo. Implementaría feature flags y configuraciones específicas por cliente, manteniendo una base de código modular con componentes reutilizables. Crearía una matriz de compatibilidad para tracking de versiones por cliente. Para despliegue: Blue-Green deployment y Canary releases para reducir riesgos. Establecería un Change Management Board para aprobar cambios críticos, con comunicación proactiva a clientes y documentación actualizada por versión."
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600" },
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "text-blue-600" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Problema 4: Gestión de Proyectos</h1>
          <p className="text-sm text-gray-600">Preguntas de experiencia práctica</p>
        </div>
      </div>

      {/* Question Navigation - Compact */}
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, index) => {
          const Icon = q.icon;
          const colors = getColorClasses(q.color);
          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestion(index)}
              className={`p-3 rounded-lg border transition-all text-center ${
                activeQuestion === index
                  ? `${colors.bg} ${colors.border} ${colors.text} shadow-sm`
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 mx-auto mb-1 ${activeQuestion === index ? colors.icon : ''}`} />
              <div className="text-xs font-medium">{q.title}</div>
            </button>
          );
        })}
      </div>

      {/* Question Content - Compact */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Question Header */}
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getColorClasses(questions[activeQuestion].color).bg}`}>
              {(() => {
                const Icon = questions[activeQuestion].icon;
                return <Icon className={`w-4 h-4 ${getColorClasses(questions[activeQuestion].color).icon}`} />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">
                Pregunta {questions[activeQuestion].id}: {questions[activeQuestion].title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {questions[activeQuestion].question}
              </p>
            </div>
          </div>

          {/* Answer - Personal Style */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">W</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-800">William (Desarrollador)</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {questions[activeQuestion].answer}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Tips Prácticos</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              {activeQuestion === 0 && "• Usa MoSCoW para priorizar • Comunica temprano • Considera pair programming"}
              {activeQuestion === 1 && "• Evalúa impacto real • Ofrece alternativas • Documenta todo"}
              {activeQuestion === 2 && "• Pruebas en capas • CI/CD automático • Monitoreo proactivo"}
              {activeQuestion === 3 && "• SemVer para versionado • Feature flags • Blue-Green deployment"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Problem4;
