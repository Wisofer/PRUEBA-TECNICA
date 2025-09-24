import React, { useState } from 'react';
import { FileText, Clock, Cpu, Database, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

const AuditLog = ({ auditLog, title = "Log de Auditoría" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!auditLog) return null;

  const getStatusIcon = (isValid) => {
    return isValid ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (isValid) => {
    return isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };

  return (
    <Card className={`p-4 ${getStatusColor(auditLog.isValid !== false)}`}>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {getStatusIcon(auditLog.isValid !== false)}
          <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">
              {auditLog.timestamp} • {auditLog.operation}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge size="sm" className="bg-blue-100 text-blue-800">
            {auditLog.steps?.length || 0} pasos
          </Badge>
          {isExpanded ? 
            <ChevronDown className="w-4 h-4 text-gray-500" /> : 
            <ChevronRight className="w-4 h-4 text-gray-500" />
          }
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Información de Performance */}
          {auditLog.performance && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Métricas de Performance
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Tiempo:</span>
                  <span className="ml-1 font-medium">{auditLog.performance.executionTime}</span>
                </div>
                <div>
                  <span className="text-gray-600">Memoria:</span>
                  <span className="ml-1 font-medium">{auditLog.performance.memoryUsage}</span>
                </div>
                <div>
                  <span className="text-gray-600">Operaciones:</span>
                  <span className="ml-1 font-medium">{auditLog.performance.operationsCount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Estados:</span>
                  <span className="ml-1 font-medium">{auditLog.performance.estadosExplorados || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Pasos del Proceso */}
          {auditLog.steps && auditLog.steps.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3">
              <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Pasos del Proceso
              </h5>
              <div className="space-y-1">
                {auditLog.steps.map((step, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 font-medium">{index + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decisiones Tomadas */}
          {auditLog.decisions && auditLog.decisions.length > 0 && (
            <div className="bg-green-50 rounded-lg p-3">
              <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Decisiones Tomadas
              </h5>
              <div className="space-y-1">
                {auditLog.decisions.map((decision, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-medium">•</span>
                    <span>{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Información de Entrada */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Información de Entrada
            </h5>
            <div className="text-sm text-gray-700">
              <p><strong>Input:</strong> {auditLog.input}</p>
              <p><strong>Operación:</strong> {auditLog.operation}</p>
              <p><strong>Timestamp:</strong> {auditLog.timestamp}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AuditLog;
