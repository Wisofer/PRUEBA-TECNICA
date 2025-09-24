import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowLeft, 
  Lightbulb, 
  Code, 
  FileText, 
  Play, 
  CheckCircle,
  AlertCircle,
  Eye,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import VisualCalculator from '../../components/ui/VisualCalculator';
import AuditLog from '../../components/ui/AuditLog';
import { sumPrimeDivisors, testCases, runAllTests } from '../../utils/problem1';

const Problem1 = () => {
  const [inputNumber, setInputNumber] = useState('45');
  const [result, setResult] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleCalculate = () => {
    const num = parseInt(inputNumber);
    const calculation = sumPrimeDivisors(num);
    setResult(calculation);
  };

  const handleRunTests = () => {
    const tests = runAllTests();
    setTestResults(tests);
  };

  const resetCalculator = () => {
    setInputNumber('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Problem Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Problem Description */}
          <Card className="p-6 min-h-[300px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Problema 1</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <p className="font-medium text-gray-800 text-base">
                Sumatoria de divisores propios primos
              </p>
              <div className="space-y-2">
                <p><strong>Divisor:</strong> Número que divide de manera exacta</p>
                <p><strong>Propio:</strong> El divisor no es el mismo número</p>
                <p><strong>Primo:</strong> Solo divisible por 1 y sí mismo (matemáticas estándar)</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold text-blue-800 text-sm mb-3">Ejemplo paso a paso:</p>
                <p className="text-sm mb-1">Número: <strong>45</strong></p>
                <p className="text-sm mb-1">Divisores propios: [1, 3, 5, 9, 15]</p>
                <p className="text-sm mb-1">Verificar primalidad:</p>
                <p className="text-xs ml-3 mb-1">• 1 → no primo (matemáticas estándar)</p>
                <p className="text-xs ml-3 mb-1">• 3 → primo ✓</p>
                <p className="text-xs ml-3 mb-1">• 5 → primo ✓</p>
                <p className="text-xs ml-3 mb-1">• 9 → no primo (3×3)</p>
                <p className="text-xs ml-3 mb-2">• 15 → no primo (3×5)</p>
                <p className="text-sm text-blue-700 font-semibold">Resultado: 3 + 5 = 8</p>
              </div>
            </div>
          </Card>

          {/* Tab Navigation - Compact */}
          <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'calculator', label: 'Calc', icon: Calculator },
              { id: 'algorithm', label: 'Algo', icon: Code },
              { id: 'considerations', label: 'Info', icon: Lightbulb }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-md transition-all text-xs ${
                    activeTab === tab.id
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

        </div>

        {/* Right Main Area - Interactive Content */}
        <div className="lg:col-span-8">

          {/* Calculator Tab */}
          {activeTab === 'calculator' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Calculadora Interactiva
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Calculator */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Calculadora Visual</h4>
                  <VisualCalculator
                    value={inputNumber}
                    onChange={setInputNumber}
                    onCalculate={handleCalculate}
                    onClear={resetCalculator}
                  />
                </div>

                {/* Results Section */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Resultado del Cálculo</h4>
                  <div className="bg-gray-50 rounded-xl p-4 min-h-[400px] flex flex-col">
                    {result ? (
                      <div className="space-y-4 flex-1">
                        {result.isValid ? (
                          <>
                            {/* Main Result */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                              <div className="flex items-center justify-center gap-2 mb-3">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <span className="font-semibold text-green-800">Resultado Final</span>
                              </div>
                              <div className="text-4xl font-bold text-green-700 mb-2">
                                {result.sum}
                              </div>
                              <div className="text-sm text-green-600">
                                Suma de divisores primos
                              </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <span className="font-medium text-gray-700 text-sm">Divisores propios encontrados:</span>
                                <p className="text-gray-600 break-words mt-1 font-mono text-sm">
                                  [{result.properDivisors.join(', ')}]
                                </p>
                              </div>
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <span className="font-medium text-gray-700 text-sm">Divisores que son primos:</span>
                                <p className="text-blue-600 break-words mt-1 font-mono text-sm font-semibold">
                                  [{result.primeDivisors.join(', ')}]
                                </p>
                              </div>
                            </div>

                            {/* Process Steps */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center gap-2 mb-3">
                                <Play className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-gray-800 text-sm">Proceso paso a paso:</span>
                              </div>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-start gap-2">
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold min-w-[60px]">Paso 1:</span>
                                  <span className="text-gray-600">Encontrar divisores propios de {result.input}</span>
                                </div>
                                <div className="ml-16 text-gray-500 font-mono">
                                  [{result.properDivisors.join(', ')}]
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold min-w-[60px]">Paso 2:</span>
                                  <span className="text-gray-600">Verificar primalidad de cada divisor</span>
                                </div>
                                <div className="ml-16 space-y-1">
                                  {result.properDivisors.map((div, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                      <span className="font-mono text-gray-500">{div}</span>
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        result.primeDivisors.includes(div) 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-gray-100 text-gray-600'
                                      }`}>
                                        {result.primeDivisors.includes(div) ? 'primo ✓' : 'no primo'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold min-w-[60px]">Paso 3:</span>
                                  <span className="text-gray-600">Sumar divisores primos</span>
                                </div>
                                <div className="ml-16">
                                  <div className="bg-purple-50 rounded p-2 text-center">
                                    <span className="text-purple-700 font-mono text-sm">
                                      {result.primeDivisors.length > 0 
                                        ? `${result.primeDivisors.join(' + ')} = ${result.sum}`
                                        : 'No hay divisores primos, suma = 0'
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Log de Auditoría */}
                            {result.auditLog && (
                              <div className="mt-4">
                                <AuditLog auditLog={result.auditLog} title="Constancia de Operaciones" />
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                            <span className="font-semibold text-red-800 text-lg">Error</span>
                            <p className="text-red-700 mt-2">{result.error}</p>
                            {result.auditLog && (
                              <div className="mt-4">
                                <AuditLog auditLog={result.auditLog} title="Log de Error" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium">Esperando cálculo...</p>
                        <p className="text-sm mt-1">Usa la calculadora e presiona "=" para calcular</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </Card>
          )}

          {/* Algorithm Tab */}
          {activeTab === 'algorithm' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6" />
                Algoritmo Implementado
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Funciones principales:</h4>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                      <p><span className="text-blue-600">isPrime(num)</span> - Verifica primalidad</p>
                      <p><span className="text-blue-600">findProperDivisors(num)</span> - Encuentra divisores</p>
                      <p><span className="text-blue-600">filterPrimeDivisors(divisors)</span> - Filtra primos</p>
                      <p><span className="text-blue-600">sumPrimeDivisors(num)</span> - Función principal</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Complejidad:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li><strong>Divisores:</strong> O(√n)</li>
                      <li><strong>Primalidad:</strong> O(√d) por divisor</li>
                      <li><strong>Total:</strong> O(√n * √d_max)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Casos de prueba:</h4>
                  <Button onClick={handleRunTests} variant="success" className="mb-4" icon={<Play className="w-4 h-4" />}>
                    Ejecutar Pruebas
                  </Button>
                  
                  {testResults && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {testResults.map((test, index) => (
                        <div key={index} className={`p-2 rounded border text-xs ${
                          test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono">f({test.input}) = {test.result.sum}</span>
                            <Badge variant={test.passed ? 'success' : 'danger'} size="xs">
                              {test.passed ? '✓' : '✗'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Considerations Tab */}
          {activeTab === 'considerations' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Consideraciones Técnicas
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">🔧 Limitantes Técnicas</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <strong>Rango:</strong> Hasta 2^53 - 1</li>
                      <li>• <strong>Memoria:</strong> Arrays para números grandes</li>
                      <li>• <strong>Tiempo:</strong> Crece con √n</li>
                      <li>• <strong>Precisión:</strong> 15-17 dígitos</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">⚡ Optimizaciones</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <strong>Primalidad:</strong> Solo hasta √n</li>
                      <li>• <strong>Divisores:</strong> Complementarios</li>
                      <li>• <strong>Validación:</strong> Temprana</li>
                      <li>• <strong>Eficiencia:</strong> Evita pares</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">🚨 Casos Especiales</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <strong>n = 1:</strong> Sin divisores propios</li>
                      <li>• <strong>Primos:</strong> Solo divisor 1</li>
                      <li>• <strong>Perfectos:</strong> Muchos divisores</li>
                      <li>• <strong>Potencias 2:</strong> Solo 2 es primo</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">📊 Rendimiento</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <strong>&lt; 10^6:</strong> Instantáneo</li>
                      <li>• <strong>10^6-10^9:</strong> Milisegundos</li>
                      <li>• <strong>&gt; 10^9:</strong> Optimización extra</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem1;
