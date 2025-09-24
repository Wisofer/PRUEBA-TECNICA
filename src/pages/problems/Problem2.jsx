import React, { useState } from 'react';
import { Phone, ArrowLeft, Database, Shield, FileText, Users, Building, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DiagramaERFlow from '../../components/ui/DiagramaERFlow';
import AnalisisRiesgos from '../../components/ui/AnalisisRiesgos';

const Problem2 = () => {
  const [activeTab, setActiveTab] = useState('diagrama');

  return (
    <div className="space-y-4">
      {/* Header Compacto */}
      {/* Descripción Compacta */}
      {/* Navegación de Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'diagrama', label: 'Diagrama ER', icon: Database },
          { key: 'riesgos', label: 'Análisis de Riesgos', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenido Principal */}
      <div className="min-h-[600px]">
        {activeTab === 'diagrama' && <DiagramaERFlow />}
        {activeTab === 'riesgos' && <AnalisisRiesgos />}
      </div>
    </div>
  );
};

export default Problem2;
