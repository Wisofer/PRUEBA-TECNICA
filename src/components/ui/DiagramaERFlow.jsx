import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Database, Users, Building, Shield, FileText, CheckCircle, Download, Code, Server, FileCode } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { SQLGeneratorProblem2 } from '../../utils/sqlGeneratorProblem2';

// Definir tipos de nodos y aristas fuera del componente para evitar recreación
const nodeTypes = {};
const edgeTypes = {};

const DiagramaERFlow = () => {
  const sqlGenerator = useMemo(() => new SQLGeneratorProblem2(), []);

  // Documentación de decisiones de diseño
  const designDecisions = {
    "TIPOS_VALIDACION separada": {
      razon: "Permite escalabilidad para nuevos tipos de validación sin modificar la estructura base",
      impacto: "Facilita agregar validaciones para clientes internacionales, nuevos productos financieros, etc.",
      alternativas: "Podría estar en una tabla de configuración, pero se prefiere normalización para integridad"
    },
    "RESPUESTAS_CLIENTE separada": {
      razon: "Permite auditoría completa y análisis de patrones de comportamiento",
      impacto: "Facilita detección de fraudes, análisis de satisfacción y mejora continua",
      alternativas: "Podría estar en GESTIONES_INTERNAS, pero se prefiere separación de responsabilidades"
    },
    "GESTIONES_INTERNAS separada": {
      razon: "Mantiene separación clara entre validación de identidad y gestión de problemas",
      impacto: "Permite diferentes flujos de trabajo y métricas para cada proceso",
      alternativas: "Podría estar integrada con RESPUESTAS_CLIENTE, pero se prefiere modularidad"
    },
    "CONFIGURACIONES por banco": {
      razon: "Cada banco tiene diferentes requisitos de validación y políticas de seguridad",
      impacto: "Permite personalización completa sin afectar otros clientes del sistema",
      alternativas: "Configuración global, pero se prefiere flexibilidad por cliente"
    }
  };

  const descargarSQL = (tipo = 'completo') => {
    let sql = '';
    let nombreArchivo = '';
    
    switch (tipo) {
      case 'completo':
        sql = sqlGenerator.generarSQL();
        nombreArchivo = 'call_center_completo.sql';
        break;
      case 'tablas':
        sql = sqlGenerator.generarSoloTablas();
        nombreArchivo = 'call_center_tablas.sql';
        break;
      case 'datos':
        sql = sqlGenerator.generarSoloDatos();
        nombreArchivo = 'call_center_datos.sql';
        break;
      default:
        sql = sqlGenerator.generarSQL();
        nombreArchivo = 'call_center.sql';
    }

    const blob = new Blob([sql], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
    URL.revokeObjectURL(url);
  };

  const initialNodes = useMemo(() => [
    {
      id: 'bancos',
      type: 'default',
      position: { x: 100, y: 50 },
      data: {
        label: (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">BANCOS</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• id_banco</div>
              <div>• nombre_banco</div>
              <div>• codigo_banco</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'tipos_cliente',
      type: 'default',
      position: { x: 100, y: 250 },
      data: {
        label: (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">TIPOS_CLIENTE</span>
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <div>• id_tipo</div>
              <div>• nombre_tipo</div>
              <div>• descripcion</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'tipos_cuenta',
      type: 'default',
      position: { x: 100, y: 450 },
      data: {
        label: (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">TIPOS_CUENTA</span>
            </div>
            <div className="text-xs text-purple-700 space-y-1">
              <div>• id_tipo_cuenta</div>
              <div>• nombre_tipo</div>
              <div>• descripcion</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'tipos_validacion',
      type: 'default',
      position: { x: 100, y: 650 },
      data: {
        label: (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">TIPOS_VALIDACION</span>
            </div>
            <div className="text-xs text-purple-700 space-y-1">
              <div>• id_validacion</div>
              <div>• nombre_validacion</div>
              <div>• descripcion</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'datos_requeridos',
      type: 'default',
      position: { x: 500, y: 50 },
      data: {
        label: (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-orange-800">DATOS_REQUERIDOS</span>
            </div>
            <div className="text-xs text-orange-700 space-y-1">
              <div>• id_dato</div>
              <div>• nombre_dato</div>
              <div>• tipo_dato</div>
              <div>• obligatorio</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'configuraciones',
      type: 'default',
      position: { x: 300, y: 250 },
      data: {
        label: (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-800">CONFIGURACIONES</span>
            </div>
            <div className="text-xs text-red-700 space-y-1">
              <div>• id_config</div>
              <div>• id_banco</div>
              <div>• id_tipo_cliente</div>
              <div>• id_tipo_cuenta</div>
              <div>• id_validacion</div>
              <div>• umbral_minimo</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'config_datos',
      type: 'default',
      position: { x: 500, y: 250 },
      data: {
        label: (
          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span className="font-bold text-teal-800">CONFIG_DATOS</span>
            </div>
            <div className="text-xs text-teal-700 space-y-1">
              <div>• id_config_dato</div>
              <div>• id_config</div>
              <div>• id_dato</div>
              <div>• orden</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'intentos_validacion',
      type: 'default',
      position: { x: 300, y: 450 },
      data: {
        label: (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="font-bold text-indigo-800">INTENTOS_VALIDACION</span>
            </div>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>• id_intento</div>
              <div>• id_config</div>
              <div>• fecha_intento</div>
              <div>• ip_cliente</div>
              <div>• exitoso</div>
              <div>• observaciones</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'respuestas_cliente',
      type: 'default',
      position: { x: 500, y: 450 },
      data: {
        label: (
          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-pink-600" />
              <span className="font-bold text-pink-800">RESPUESTAS_CLIENTE</span>
            </div>
            <div className="text-xs text-pink-700 space-y-1">
              <div>• id_respuesta</div>
              <div>• id_intento</div>
              <div>• id_dato</div>
              <div>• valor_respuesta</div>
              <div>• correcta</div>
              <div>• fecha_respuesta</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'gestiones_internas',
      type: 'default',
      position: { x: 300, y: 650 },
      data: {
        label: (
          <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              <span className="font-bold text-cyan-800">GESTIONES_INTERNAS</span>
            </div>
            <div className="text-xs text-cyan-700 space-y-1">
              <div>• id_gestion</div>
              <div>• id_intento</div>
              <div>• tipo_gestion</div>
              <div>• descripcion</div>
              <div>• estado</div>
              <div>• fecha_creacion</div>
              <div>• fecha_resolucion</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
  ], []);

  const initialEdges = useMemo(() => [
    {
      id: 'bancos-configuraciones',
      source: 'bancos',
      target: 'configuraciones',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3b82f6',
      },
      label: '1:N',
      labelStyle: { fill: '#3b82f6', fontWeight: 600 },
    },
    {
      id: 'tipos_cliente-configuraciones',
      source: 'tipos_cliente',
      target: 'configuraciones',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#10b981',
      },
      label: '1:N',
      labelStyle: { fill: '#10b981', fontWeight: 600 },
    },
    {
      id: 'tipos_cuenta-configuraciones',
      source: 'tipos_cuenta',
      target: 'configuraciones',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#8b5cf6',
      },
      label: '1:N',
      labelStyle: { fill: '#8b5cf6', fontWeight: 600 },
    },
    {
      id: 'tipos_validacion-configuraciones',
      source: 'tipos_validacion',
      target: 'configuraciones',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#8b5cf6',
      },
      label: '1:N',
      labelStyle: { fill: '#8b5cf6', fontWeight: 600 },
    },
    {
      id: 'configuraciones-config_datos',
      source: 'configuraciones',
      target: 'config_datos',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#ef4444', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ef4444',
      },
      label: '1:N',
      labelStyle: { fill: '#ef4444', fontWeight: 600 },
    },
    {
      id: 'datos_requeridos-config_datos',
      source: 'datos_requeridos',
      target: 'config_datos',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#f97316', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#f97316',
      },
      label: '1:N',
      labelStyle: { fill: '#f97316', fontWeight: 600 },
    },
    {
      id: 'configuraciones-intentos_validacion',
      source: 'configuraciones',
      target: 'intentos_validacion',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#ef4444', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ef4444',
      },
      label: '1:N',
      labelStyle: { fill: '#ef4444', fontWeight: 600 },
    },
    {
      id: 'intentos_validacion-respuestas_cliente',
      source: 'intentos_validacion',
      target: 'respuestas_cliente',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#6366f1',
      },
      label: '1:N',
      labelStyle: { fill: '#6366f1', fontWeight: 600 },
    },
    {
      id: 'datos_requeridos-respuestas_cliente',
      source: 'datos_requeridos',
      target: 'respuestas_cliente',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#f97316', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#f97316',
      },
      label: '1:N',
      labelStyle: { fill: '#f97316', fontWeight: 600 },
    },
    {
      id: 'intentos_validacion-gestiones_internas',
      source: 'intentos_validacion',
      target: 'gestiones_internas',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#6366f1',
      },
      label: '1:N',
      labelStyle: { fill: '#6366f1', fontWeight: 600 },
    },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Diagrama Entidad-Relación Interactivo
          </h3>
        </div>
        
        {/* Botones de descarga SQL - Compacto */}
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Descargar SQL:</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => descargarSQL('completo')}
              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
              title="Descargar Script Completo"
            >
              <Download className="w-3 h-3" />
              Completo
            </button>
            <button
              onClick={() => descargarSQL('tablas')}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
              title="Descargar Solo Tablas"
            >
              <Download className="w-3 h-3" />
              Tablas
            </button>
            <button
              onClick={() => descargarSQL('datos')}
              className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center gap-1"
              title="Descargar Solo Datos"
            >
              <Download className="w-3 h-3" />
              Datos
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Descripción */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Descripción del Modelo</h4>
          <p className="text-sm text-gray-600">
            Este diagrama ER interactivo permite explorar las configuraciones dinámicas de validación por banco, 
            tipo de cliente, tipo de cuenta y tipo de validación. Incluye el registro completo de 
            intentos de validación, respuestas de clientes y gestión de tickets internos para 
            resolución de problemas.
          </p>
        </div>

        {/* Controles */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <span className="font-medium">💡 Controles:</span>
            <span>• Arrastra para mover nodos</span>
            <span>• Zoom con rueda del mouse</span>
            <span>• Pan arrastrando el fondo</span>
            <span>• Usa los controles inferiores</span>
          </div>
        </div>

        {/* Diagrama Interactivo */}
        <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={{
              padding: 0.2,
              includeHiddenNodes: false,
              minZoom: 0.5,
              maxZoom: 1.5
            }}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                const colors = {
                  'bancos': '#3b82f6',
                  'tipos_cliente': '#10b981',
                  'tipos_cuenta': '#8b5cf6',
                  'tipos_validacion': '#8b5cf6',
                  'datos_requeridos': '#f97316',
                  'configuraciones': '#ef4444',
                  'config_datos': '#14b8a6',
                  'intentos_validacion': '#6366f1',
                  'respuestas_cliente': '#ec4899',
                  'gestiones_internas': '#06b6d4',
                };
                return colors[node.id] || '#6b7280';
              }}
              nodeStrokeWidth={3}
              nodeBorderRadius={8}
            />
            <Background variant="dots" gap={20} size={1} />
          </ReactFlow>
        </div>

        {/* Tipos de Cuenta Específicos */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-3">Tipos de Cuenta Bancaria</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded border border-orange-200">
              <h5 className="font-medium text-orange-800 text-sm">💰 Monetarios</h5>
              <p className="text-xs text-orange-600">Cuentas corrientes</p>
            </div>
            <div className="bg-white p-3 rounded border border-orange-200">
              <h5 className="font-medium text-orange-800 text-sm">🏦 Ahorros</h5>
              <p className="text-xs text-orange-600">Cuentas de ahorro</p>
            </div>
            <div className="bg-white p-3 rounded border border-orange-200">
              <h5 className="font-medium text-orange-800 text-sm">💳 Tarjeta de Crédito</h5>
              <p className="text-xs text-orange-600">Productos crediticios</p>
            </div>
            <div className="bg-white p-3 rounded border border-orange-200">
              <h5 className="font-medium text-orange-800 text-sm">👴 Fondos de Pensión</h5>
              <p className="text-xs text-orange-600">Productos de pensión</p>
            </div>
          </div>
        </div>

        {/* Características Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">✅ Flexibilidad</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Configuraciones por banco</li>
              <li>• Múltiples tipos de cliente</li>
              <li>• Tipos de cuenta específicos</li>
              <li>• Validaciones variadas</li>
              <li>• Umbrales configurables</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">📊 Auditoría</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Registro de intentos</li>
              <li>• Historial de respuestas</li>
              <li>• Trazabilidad completa</li>
              <li>• Métricas de seguridad</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-800 mb-2">🎫 Gestión</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Tickets de soporte</li>
              <li>• Seguimiento de problemas</li>
              <li>• Estados de resolución</li>
              <li>• Gestión interna completa</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiagramaERFlow;
