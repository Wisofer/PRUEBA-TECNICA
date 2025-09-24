import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  ArrowLeft, 
  Target, 
  Zap, 
  BarChart3, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import VasijaVisualizer from '../../components/ui/VasijaVisualizer';
import { 
  VasijaSolver, 
  EstadoVasijas, 
  casosPrueba, 
  ejecutarCasosPrueba 
} from '../../utils/problem3';

const Problem3 = () => {
  const [capacidades, setCapacidades] = useState([3, 4, 5]);
  const [estadoActual, setEstadoActual] = useState(new EstadoVasijas(0, 0, 0, [3, 4, 5]));
  const [solucion, setSolucion] = useState(null);
  const [simulando, setSimulando] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [operacionActual, setOperacionActual] = useState(null);
  const [activeTab, setActiveTab] = useState('simulator');
  const [casosPruebaResultados, setCasosPruebaResultados] = useState(null);

  const solver = new VasijaSolver(capacidades);

  const resolverProblema = () => {
    const resultado = solver.resolver();
    setSolucion(resultado);
    setPasoActual(0);
    setOperacionActual(null);
  };

  const simularSolucion = async () => {
    if (!solucion || !solucion.exito) return;

    setSimulando(true);
    setEstadoActual(new EstadoVasijas(0, 0, 0, capacidades));
    setPasoActual(0);

    await solver.simularSolucion(
      solucion.pasos,
      (paso, operacion, estado) => {
        setPasoActual(paso);
        setOperacionActual(operacion);
        setEstadoActual(estado);
      },
      1500
    );

    setSimulando(false);
    setOperacionActual(null);
  };

  const reiniciarSimulacion = () => {
    setSimulando(false);
    setEstadoActual(new EstadoVasijas(0, 0, 0, capacidades));
    setPasoActual(0);
    setOperacionActual(null);
  };

  const ejecutarCasosPrueba = () => {
    const resultados = casosPrueba.map(caso => {
      const solverCaso = new VasijaSolver(caso.capacidades);
      const resultado = solverCaso.resolver();
      const estadisticas = resultado.exito ? solverCaso.analizarEficiencia(resultado.pasos) : null;
      return { ...caso, resultado, estadisticas, exito: resultado.exito };
    });
    setCasosPruebaResultados(resultados);
  };

  const cambiarCapacidades = (nuevasCapacidades) => {
    setCapacidades(nuevasCapacidades);
    setEstadoActual(new EstadoVasijas(0, 0, 0, nuevasCapacidades));
    setSolucion(null);
    setPasoActual(0);
    setOperacionActual(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Problem description */}
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Descripción del Problema</h2>
          <div className="prose text-gray-600">
            <p>
              Optimizar el llenado de vasijas con diferentes capacidades siguiendo reglas específicas 
              de transferencia para minimizar el desperdicio de agua.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Vasijas:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Vasija A: {capacidades[0]} galones</li>
                  <li>• Vasija B: {capacidades[1]} galones</li>
                  <li>• Vasija C: {capacidades[2]} galones</li>
                </ul>
                <p className="text-sm mt-2"><strong>Restricciones:</strong> Solo B→A y C→B</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Reglas:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Si sobrepasa capacidad: resto queda en origen</li>
                  <li>• Si no sobrepasa: origen se vacía completamente</li>
                  <li>• B→A: nunca sobrepasa capacidad de A</li>
                  <li>• Objetivo: Llenar vasija A</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Problem Info */}
        <div className="lg:col-span-4 space-y-6">

          {/* Configuration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidades de las Vasijas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {capacidades.map((cap, index) => (
                    <div key={index}>
                      <label className="block text-xs text-gray-600 mb-1">
                        Vasija {String.fromCharCode(65 + index)}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={cap === 0 ? '' : cap}
                        onChange={(e) => {
                          const nuevasCapacidades = [...capacidades];
                          const valor = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                          nuevasCapacidades[index] = valor;
                          cambiarCapacidades(nuevasCapacidades);
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            const nuevasCapacidades = [...capacidades];
                            nuevasCapacidades[index] = 0;
                            cambiarCapacidades(nuevasCapacidades);
                          }
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={resolverProblema}
                  className="w-full"
                  icon={<Target className="w-4 h-4" />}
                >
                  Resolver Problema
                </Button>
                
                {solucion && solucion.exito && (
                  <Button 
                    onClick={simulando ? reiniciarSimulacion : simularSolucion}
                    variant={simulando ? "danger" : "success"}
                    className="w-full"
                    icon={simulando ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  >
                    {simulando ? 'Pausar' : 'Simular'} Solución
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Solution Info */}
          {solucion && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {solucion.exito ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-medium ${solucion.exito ? 'text-green-800' : 'text-red-800'}`}>
                    {solucion.exito ? 'Solución encontrada' : 'Sin solución'}
                  </span>
                </div>

                {solucion.exito && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        {solucion.totalOperaciones} operaciones
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">
                        Nivel: {solucion.nivel}
                      </span>
                    </div>
                  </>
                )}

                {solucion.mensaje && (
                  <p className="text-sm text-red-600">{solucion.mensaje}</p>
                )}
              </div>
            </Card>
          )}

          {/* Tab Navigation - Compact */}
          <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'simulator', label: 'Sim', icon: Play },
              { id: 'algorithm', label: 'Algo', icon: Target },
              { id: 'analysis', label: 'Análisis', icon: BarChart3 },
              { id: 'tests', label: 'Pruebas', icon: CheckCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-md transition-all text-xs ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-sm'
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
          {/* Simulator Tab */}
          {activeTab === 'simulator' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Play className="w-6 h-6" />
                Simulador Visual
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visualizer */}
                <div>
                  <VasijaVisualizer 
                    estado={estadoActual}
                    operacionActual={operacionActual}
                    animando={simulando}
                  />
                </div>

                {/* Progress and Steps */}
                <div className="space-y-4">
                  {/* Progress */}
                  {solucion && solucion.exito && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Progreso</span>
                        <span className="text-sm text-gray-600">
                          {pasoActual} / {solucion.totalOperaciones}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(pasoActual / solucion.totalOperaciones) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Quick Steps Preview */}
                  {solucion && solucion.exito && (
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <h4 className="font-medium text-gray-800 mb-3">Secuencia de Pasos</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {solucion.pasos.map((paso, index) => (
                          <div key={index} className={`p-2 rounded text-xs ${
                            index < pasoActual ? 'bg-green-50 text-green-800' : 
                            index === pasoActual ? 'bg-blue-50 text-blue-800' : 
                            'bg-gray-50 text-gray-600'
                          }`}>
                            <span className="font-medium">Paso {index + 1}:</span> {paso.descripcion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        estadoActual.isVasijaALlena() ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {estadoActual.isVasijaALlena() ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Target className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <p className={`text-sm font-medium ${
                        estadoActual.isVasijaALlena() ? 'text-green-800' : 'text-blue-800'
                      }`}>
                        {estadoActual.isVasijaALlena() ? 'Objetivo alcanzado!' : 'Objetivo: Llenar vasija A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Algorithm Tab */}
          {activeTab === 'algorithm' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Algoritmo Implementado
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Estrategia: BFS</h4>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                      <p><strong>1. Estado Inicial:</strong> Todas las vasijas vacías (0,0,0)</p>
                      <p><strong>2. Objetivo:</strong> Vasija A llena ({capacidades[0]} galones)</p>
                      <p><strong>3. Operaciones:</strong> Llenar, Transferir, Vaciar</p>
                      <p><strong>4. Búsqueda:</strong> Explorar todos los estados posibles</p>
                      <p><strong>5. Optimización:</strong> Encontrar la secuencia más corta</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Complejidad</h4>
                    <div className="bg-blue-50 rounded-lg p-4 text-sm space-y-1">
                      <p><strong>Tiempo:</strong> O(b^d) donde b=branching factor</p>
                      <p><strong>Espacio:</strong> O(b^d) para almacenar estados</p>
                      <p><strong>Óptimo:</strong> BFS garantiza solución más corta</p>
                    </div>
                  </div>

                  {/* Métricas de Performance */}
                  {solucion && solucion.performanceMetrics && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Métricas de Performance</h4>
                      <div className="bg-green-50 rounded-lg p-4 text-sm space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-600">Estados explorados:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.estadosExplorados}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tiempo ejecución:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.tiempoEjecucion.toFixed(3)}ms</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Operaciones generadas:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.operacionesGeneradas}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Estados visitados:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.estadosVisitados}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Máxima profundidad:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.maxProfundidad}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Memoria utilizada:</span>
                            <span className="ml-1 font-medium">{solucion.performanceMetrics.memoriaUtilizada}MB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Secuencia de Operaciones</h4>
                  {solucion && solucion.exito ? (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {solucion.pasos.map((paso, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          index < pasoActual ? 'bg-green-50 border-green-200' : 
                          index === pasoActual ? 'bg-blue-50 border-blue-200' : 
                          'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Paso {index + 1}: {paso.descripcion}
                            </span>
                            <Badge variant={
                              index < pasoActual ? 'success' : 
                              index === pasoActual ? 'primary' : 'default'
                            } size="xs">
                              {index < pasoActual ? '✓' : index === pasoActual ? '→' : '○'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Resuelve el problema primero para ver la secuencia</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Análisis de Eficiencia
              </h3>
              
              {solucion && solucion.exito ? (
                <div className="space-y-6">
                  {(() => {
                    const estadisticas = solver.analizarEficiencia(solucion.pasos);
                    return (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{estadisticas.totalOperaciones}</div>
                            <div className="text-sm text-gray-600">Total Operaciones</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{estadisticas.operacionesTransferencia}</div>
                            <div className="text-sm text-gray-600">Transferencias</div>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-orange-600">{estadisticas.operacionesVaciado}</div>
                            <div className="text-sm text-gray-600">Vaciados</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">{Math.round(estadisticas.eficiencia)}%</div>
                            <div className="text-sm text-gray-600">Eficiencia</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-3">Métricas Detalladas</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Agua transferida:</span>
                                <span className="font-medium">{estadisticas.aguaTransferida} galones</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Objetivo alcanzado:</span>
                                <span className="font-medium">{capacidades[0]} galones</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ops por galón:</span>
                                <span className="font-medium">{(estadisticas.totalOperaciones / capacidades[0]).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                            <h4 className="font-medium text-gray-800 mb-3">Evaluación</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  estadisticas.eficiencia > 100 ? 'bg-green-500' : 
                                  estadisticas.eficiencia > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                                <span>Eficiencia: {Math.round(estadisticas.eficiencia)}%</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-2">
                                {estadisticas.eficiencia > 100 ? 'Excelente eficiencia' : 
                                 estadisticas.eficiencia > 50 ? 'Buena eficiencia' : 'Eficiencia mejorable'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Consideraciones Técnicas */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                          <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Consideraciones para Vasijas de Distintas Capacidades
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-3">
                              <div className="bg-white rounded-lg p-3 border border-blue-100">
                                <h5 className="font-medium text-blue-800 mb-2">Escalabilidad</h5>
                                <ul className="space-y-1 text-gray-600">
                                  <li>• Algoritmo BFS: O(b^d) complejidad</li>
                                  <li>• Capacidades grandes: más estados posibles</li>
                                  <li>• Memoria: proporcional a estados explorados</li>
                                </ul>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-green-100">
                                <h5 className="font-medium text-green-800 mb-2">Optimizaciones</h5>
                                <ul className="space-y-1 text-gray-600">
                                  <li>• Detección de ciclos infinitos</li>
                                  <li>• Podado de ramas inútiles</li>
                                  <li>• Límite de profundidad máxima</li>
                                </ul>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-white rounded-lg p-3 border border-orange-100">
                                <h5 className="font-medium text-orange-800 mb-2">Limitaciones</h5>
                                <ul className="space-y-1 text-gray-600">
                                  <li>• Capacidades muy grandes: timeout</li>
                                  <li>• Memoria insuficiente para casos extremos</li>
                                  <li>• Restricciones de transferencia fijas</li>
                                </ul>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-purple-100">
                                <h5 className="font-medium text-purple-800 mb-2">Recomendaciones</h5>
                                <ul className="space-y-1 text-gray-600">
                                  <li>• Capacidades ≤ 100 para rendimiento óptimo</li>
                                  <li>• Implementar timeout de 30 segundos</li>
                                  <li>• Usar heurísticas para casos complejos</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Análisis de Eficiencia</p>
                  <p className="text-sm mt-1">Resuelve el problema primero para ver las métricas</p>
                </div>
              )}
            </Card>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <Card className="p-6 min-h-[500px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Casos de Prueba
              </h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <Button 
                    onClick={ejecutarCasosPrueba}
                    variant="success"
                    icon={<Play className="w-4 h-4" />}
                    size="lg"
                  >
                    Ejecutar Casos de Prueba
                  </Button>
                </div>

                {casosPruebaResultados ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {casosPruebaResultados.map((caso, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        caso.exito ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">{caso.nombre}</h4>
                          <Badge variant={caso.exito ? 'success' : 'danger'} size="sm">
                            {caso.exito ? '✓' : '✗'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{caso.descripcion}</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Capacidades:</span>
                            <span className="font-mono">[{caso.capacidades.join(', ')}]</span>
                          </div>
                          {caso.exito ? (
                            <>
                              <div className="flex justify-between">
                                <span>Operaciones:</span>
                                <span className="font-medium">{caso.resultado.totalOperaciones}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Eficiencia:</span>
                                <span className="font-medium">{Math.round(caso.estadisticas.eficiencia)}%</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-red-600 text-xs">
                              Sin solución encontrada
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Casos de Prueba</p>
                    <p className="text-sm mt-1">Presiona el botón para ejecutar las pruebas automáticas</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem3;
