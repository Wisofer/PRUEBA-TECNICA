import React, { useState } from 'react';
import { Database, ArrowLeft, Network, FileImage, Code, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DiagramaERCRM from '../../components/ui/DiagramaERCRM';
import SimuladorIntuitivo from '../../components/ui/SimuladorIntuitivo';
import EstructuraComunicacion from '../../components/ui/EstructuraComunicacion';

const Problem5 = () => {
  const [activeTab, setActiveTab] = useState('simulador');

  return (
    <div className="space-y-6">
      {/* Navegación de Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'diagrama', label: 'Diagrama ER', icon: Database },
          { key: 'simulador', label: 'Simulador', icon: Code },
          { key: 'comunicacion', label: 'Comunicación', icon: Network }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                activeTab === tab.key
                  ? 'bg-white text-indigo-600 shadow-sm'
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
        {activeTab === 'diagrama' && <DiagramaERCRM />}
        {activeTab === 'simulador' && <SimuladorIntuitivo />}
        {activeTab === 'comunicacion' && <EstructuraComunicacion />}
      </div>
    </div>
  );
};

export default Problem5;
