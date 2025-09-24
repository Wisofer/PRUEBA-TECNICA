import React, { useState, useEffect } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import Button from './Button';
import { Play } from 'lucide-react';

const TutorialButtons = () => {
  const { currentStep, steps, setCurrentStep, setIsOpen } = useTour();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      localStorage.setItem('tutorial-completed', 'true');
    }
  };

  const skipTutorial = () => {
    setIsOpen(false);
    localStorage.setItem('tutorial-completed', 'true');
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={skipTutorial}>
        Saltar Tutorial
      </Button>
      <Button size="sm" variant="primary" onClick={nextStep}>
        {isLastStep ? 'Completar Tutorial' : 'Siguiente'}
      </Button>
    </div>
  );
};

const TutorialContent = () => {
  const { isOpen, setIsOpen } = useTour();
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón de tutorial solo si no se ha completado
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('tutorial-completed');
    if (!tutorialCompleted) {
      setIsVisible(true);
    }
  }, []);

  const startTutorial = () => {
    setIsOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={startTutorial}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
        icon={<Play className="w-4 h-4" />}
      >
        Iniciar Tutorial
      </Button>
    </div>
  );
};

const TutorialProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      selector: '[data-tour="dashboard-title"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">¡Bienvenido a la Prueba Técnica!</h3>
          <p className="text-gray-600 mb-4">
            Este es el dashboard principal donde puedes ver todos los problemas disponibles.
          </p>
          <TutorialButtons />
        </div>
      ),
    },
    {
      selector: '[data-tour="problem-cards"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Problemas a Resolver</h3>
          <p className="text-gray-600 mb-4">
            Aquí puedes ver los 5 problemas de la prueba técnica. Haz clic en cualquier problema para comenzar.
          </p>
          <TutorialButtons />
        </div>
      ),
    },
    {
      selector: '[data-tour="sidebar"]',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Navegación</h3>
          <p className="text-gray-600 mb-4">
            Usa el sidebar para navegar rápidamente entre problemas. También puedes usar el botón de menú en móviles.
          </p>
          <TutorialButtons />
        </div>
      ),
    },
  ];

  return (
    <TourProvider
      steps={steps}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="reactour__tours"
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }),
        mask: (base) => ({
          ...base,
          color: 'rgba(0, 0, 0, 0.6)',
        }),
      }}
    >
      {children}
      <TutorialContent />
    </TourProvider>
  );
};

export default TutorialProvider;