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
import { Database, FileText, Image, Folder, Key, Tag, Download, Code, Server, FileCode } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { SQLGenerator } from '../../utils/sqlGenerator';

// Definir tipos de nodos y aristas fuera del componente para evitar recreación
const nodeTypes = {};
const edgeTypes = {};

const DiagramaERCRM = () => {
  const sqlGenerator = useMemo(() => new SQLGenerator(), []);

  const descargarSQL = (tipo = 'completo') => {
    let sql = '';
    let nombreArchivo = '';
    
    switch (tipo) {
      case 'completo':
        sql = sqlGenerator.generarSQL();
        nombreArchivo = 'sistema_crm_completo.sql';
        break;
      case 'tablas':
        sql = sqlGenerator.generarSoloTablas();
        nombreArchivo = 'sistema_crm_tablas.sql';
        break;
      case 'datos':
        sql = sqlGenerator.generarSoloDatos();
        nombreArchivo = 'sistema_crm_datos.sql';
        break;
      default:
        sql = sqlGenerator.generarSQL();
        nombreArchivo = 'sistema_crm.sql';
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
      id: 'expedientes',
      type: 'default',
      position: { x: 100, y: 50 },
      data: {
        label: (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">EXPEDIENTES</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• id_expediente (PK)</div>
              <div>• nombre_expediente</div>
              <div>• descripcion</div>
              <div>• fecha_creacion</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'llaves_expediente',
      type: 'default',
      position: { x: 100, y: 250 },
      data: {
        label: (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">LLAVES_EXPEDIENTE</span>
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <div>• id_llave (PK)</div>
              <div>• id_expediente (FK)</div>
              <div>• nombre_llave</div>
              <div>• tipo_dato</div>
              <div>• longitud</div>
              <div>• obligatorio</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'categorias',
      type: 'default',
      position: { x: 100, y: 450 },
      data: {
        label: (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">CATEGORIAS</span>
            </div>
            <div className="text-xs text-purple-700 space-y-1">
              <div>• id_categoria (PK)</div>
              <div>• id_expediente (FK)</div>
              <div>• nombre_categoria</div>
              <div>• categoria_padre (FK)</div>
              <div>• nivel</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'tipos_documento',
      type: 'default',
      position: { x: 100, y: 650 },
      data: {
        label: (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-orange-800">TIPOS_DOCUMENTO</span>
            </div>
            <div className="text-xs text-orange-700 space-y-1">
              <div>• id_tipo_doc (PK)</div>
              <div>• id_categoria (FK)</div>
              <div>• nombre_tipo</div>
              <div>• descripcion</div>
              <div>• formato_permitido</div>
              <div>• tamaño_maximo</div>
              <div>• activo</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'documentos',
      type: 'default',
      position: { x: 500, y: 50 },
      data: {
        label: (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-800">DOCUMENTOS</span>
            </div>
            <div className="text-xs text-red-700 space-y-1">
              <div>• id_documento (PK)</div>
              <div>• id_tipo_doc (FK)</div>
              <div>• id_expediente (FK)</div>
              <div>• numero_documento</div>
              <div>• fecha_ingreso</div>
              <div>• fecha_expiracion</div>
              <div>• estado</div>
              <div>• metadata</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'llaves_documento',
      type: 'default',
      position: { x: 500, y: 250 },
      data: {
        label: (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-5 h-5 text-indigo-600" />
              <span className="font-bold text-indigo-800">LLAVES_DOCUMENTO</span>
            </div>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>• id_llave_doc (PK)</div>
              <div>• id_documento (FK)</div>
              <div>• id_llave_exp (FK)</div>
              <div>• valor_llave</div>
              <div>• fecha_actualizacion</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'propiedades_documento',
      type: 'default',
      position: { x: 500, y: 450 },
      data: {
        label: (
          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-teal-600" />
              <span className="font-bold text-teal-800">PROPIEDADES_DOCUMENTO</span>
            </div>
            <div className="text-xs text-teal-700 space-y-1">
              <div>• id_propiedad (PK)</div>
              <div>• id_documento (FK)</div>
              <div>• nombre_propiedad</div>
              <div>• valor_propiedad</div>
              <div>• tipo_dato</div>
              <div>• fecha_actualizacion</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'imagenes',
      type: 'default',
      position: { x: 500, y: 650 },
      data: {
        label: (
          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-5 h-5 text-pink-600" />
              <span className="font-bold text-pink-800">IMAGENES</span>
            </div>
            <div className="text-xs text-pink-700 space-y-1">
              <div>• id_imagen (PK)</div>
              <div>• id_documento (FK)</div>
              <div>• numero_pagina</div>
              <div>• nombre_archivo</div>
              <div>• ruta_archivo</div>
              <div>• tamaño_archivo</div>
              <div>• formato_archivo</div>
              <div>• fecha_subida</div>
              <div>• checksum</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    },
    {
      id: 'cache_consultas',
      type: 'default',
      position: { x: 800, y: 350 },
      data: {
        label: (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">CACHE_CONSULTAS</span>
            </div>
            <div className="text-xs text-yellow-700 space-y-1">
              <div>• id_cache (PK)</div>
              <div>• tipo_transaccion</div>
              <div>• parametros_hash</div>
              <div>• resultado_xml</div>
              <div>• fecha_creacion</div>
              <div>• fecha_expiracion</div>
              <div>• hits</div>
            </div>
          </div>
        ),
      },
      style: { background: 'transparent', border: 'none' },
    }
  ], []);

  const initialEdges = useMemo(() => [
    {
      id: 'expedientes-llaves',
      source: 'expedientes',
      target: 'llaves_expediente',
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
      id: 'expedientes-categorias',
      source: 'expedientes',
      target: 'categorias',
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
      id: 'categorias-tipos',
      source: 'categorias',
      target: 'tipos_documento',
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
      id: 'tipos-documentos',
      source: 'tipos_documento',
      target: 'documentos',
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
      id: 'expedientes-documentos',
      source: 'expedientes',
      target: 'documentos',
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
      id: 'documentos-llaves',
      source: 'documentos',
      target: 'llaves_documento',
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
      id: 'llaves-exp-llaves-doc',
      source: 'llaves_expediente',
      target: 'llaves_documento',
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
      id: 'documentos-propiedades',
      source: 'documentos',
      target: 'propiedades_documento',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#14b8a6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#14b8a6',
      },
      label: '1:N',
      labelStyle: { fill: '#14b8a6', fontWeight: 600 },
    },
    {
      id: 'documentos-imagenes',
      source: 'documentos',
      target: 'imagenes',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#ec4899', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ec4899',
      },
      label: '1:N',
      labelStyle: { fill: '#ec4899', fontWeight: 600 },
    }
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Database className="w-8 h-8 text-indigo-600" />
            Diagrama ER - Sistema CRM
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Estructura de base de datos para replicar la información del sistema administrador de imágenes 
            en el CRM, optimizando la comunicación y reduciendo consultas repetitivas.
          </p>
          
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

        {/* Diagrama */}
        <div className="h-[700px] border-2 border-gray-200 rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#f1f5f9" gap={20} />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.id) {
                  case 'expedientes': return '#3b82f6';
                  case 'llaves_expediente': return '#10b981';
                  case 'categorias': return '#8b5cf6';
                  case 'tipos_documento': return '#f97316';
                  case 'documentos': return '#ef4444';
                  case 'llaves_documento': return '#6366f1';
                  case 'propiedades_documento': return '#14b8a6';
                  case 'imagenes': return '#ec4899';
                  case 'cache_consultas': return '#eab308';
                  default: return '#6b7280';
                }
              }}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          </ReactFlow>
        </div>

        {/* Características Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h5 className="font-semibold text-indigo-800 mb-2">🔄 Replicación</h5>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Estructura idéntica al sistema origen</li>
              <li>• Sincronización automática</li>
              <li>• Cache inteligente</li>
              <li>• Optimización de consultas</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">⚡ Performance</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Índices optimizados</li>
              <li>• Cache de consultas frecuentes</li>
              <li>• Compresión de datos</li>
              <li>• Consultas paralelas</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-800 mb-2">🔍 Búsquedas</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Llaves dinámicas</li>
              <li>• Búsqueda por múltiples criterios</li>
              <li>• Filtros avanzados</li>
              <li>• Resultados paginados</li>
            </ul>
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-4">💡 Beneficios de la Replicación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h5 className="font-medium mb-2">Reducción de Latencia:</h5>
              <p>Consultas locales en lugar de llamadas remotas al sistema de imágenes</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Mejor Disponibilidad:</h5>
              <p>Funcionamiento independiente del sistema origen</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Optimización de Recursos:</h5>
              <p>Menor carga en el sistema de imágenes</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Escalabilidad:</h5>
              <p>Capacidad de manejar múltiples clientes CRM</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiagramaERCRM;
