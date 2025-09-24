/**
 * Generador de SQL para el diagrama ER del Problema 5
 * Genera scripts SQL para crear las tablas del sistema CRM
 */

export class SQLGenerator {
  constructor() {
    this.tablas = this.definirTablas();
  }

  /**
   * Definir estructura de tablas
   */
  definirTablas() {
    return [
      {
        nombre: 'EXPEDIENTES',
        campos: [
          { nombre: 'id_expediente', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del expediente' },
          { nombre: 'nombre_expediente', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre del expediente (Créditos, Ahorros, etc.)' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción detallada del expediente' },
          { nombre: 'fecha_creacion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de creación del expediente' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo del expediente' }
        ]
      },
      {
        nombre: 'LLAVES_EXPEDIENTE',
        campos: [
          { nombre: 'id_llave', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la llave' },
          { nombre: 'id_expediente', tipo: 'INT', pk: false, fk: 'EXPEDIENTES.id_expediente', descripcion: 'Referencia al expediente' },
          { nombre: 'nombre_llave', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Nombre de la llave (Cliente, Cuenta, etc.)' },
          { nombre: 'tipo_dato', tipo: 'VARCHAR(20)', pk: false, descripcion: 'Tipo de dato (num, alfa, date)' },
          { nombre: 'longitud', tipo: 'INT', pk: false, descripcion: 'Longitud máxima del campo' },
          { nombre: 'obligatorio', tipo: 'BOOLEAN', pk: false, descripcion: 'Si el campo es obligatorio' }
        ]
      },
      {
        nombre: 'CATEGORIAS',
        campos: [
          { nombre: 'id_categoria', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la categoría' },
          { nombre: 'id_expediente', tipo: 'INT', pk: false, fk: 'EXPEDIENTES.id_expediente', descripcion: 'Referencia al expediente' },
          { nombre: 'nombre_categoria', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre de la categoría' },
          { nombre: 'categoria_padre', tipo: 'INT', pk: false, fk: 'CATEGORIAS.id_categoria', descripcion: 'Referencia a categoría padre' },
          { nombre: 'nivel', tipo: 'INT', pk: false, descripcion: 'Nivel jerárquico de la categoría' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'TIPOS_DOCUMENTO',
        campos: [
          { nombre: 'id_tipo_doc', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del tipo de documento' },
          { nombre: 'id_categoria', tipo: 'INT', pk: false, fk: 'CATEGORIAS.id_categoria', descripcion: 'Referencia a la categoría' },
          { nombre: 'nombre_tipo', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre del tipo de documento' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción del tipo de documento' },
          { nombre: 'formato_permitido', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Formatos de archivo permitidos' },
          { nombre: 'tamaño_maximo', tipo: 'INT', pk: false, descripcion: 'Tamaño máximo en MB' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'DOCUMENTOS',
        campos: [
          { nombre: 'id_documento', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del documento' },
          { nombre: 'id_tipo_doc', tipo: 'INT', pk: false, fk: 'TIPOS_DOCUMENTO.id_tipo_doc', descripcion: 'Referencia al tipo de documento' },
          { nombre: 'id_expediente', tipo: 'INT', pk: false, fk: 'EXPEDIENTES.id_expediente', descripcion: 'Referencia al expediente' },
          { nombre: 'numero_documento', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Número único del documento' },
          { nombre: 'fecha_ingreso', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de ingreso del documento' },
          { nombre: 'fecha_expiracion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de expiración del documento' },
          { nombre: 'estado', tipo: 'VARCHAR(20)', pk: false, descripcion: 'Estado del documento' },
          { nombre: 'metadata', tipo: 'JSON', pk: false, descripcion: 'Metadatos adicionales en formato JSON' }
        ]
      },
      {
        nombre: 'LLAVES_DOCUMENTO',
        campos: [
          { nombre: 'id_llave_doc', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la llave del documento' },
          { nombre: 'id_documento', tipo: 'INT', pk: false, fk: 'DOCUMENTOS.id_documento', descripcion: 'Referencia al documento' },
          { nombre: 'id_llave_exp', tipo: 'INT', pk: false, fk: 'LLAVES_EXPEDIENTE.id_llave', descripcion: 'Referencia a la llave del expediente' },
          { nombre: 'valor_llave', tipo: 'VARCHAR(255)', pk: false, descripcion: 'Valor de la llave' },
          { nombre: 'fecha_actualizacion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de última actualización' }
        ]
      },
      {
        nombre: 'PROPIEDADES_DOCUMENTO',
        campos: [
          { nombre: 'id_propiedad', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la propiedad' },
          { nombre: 'id_documento', tipo: 'INT', pk: false, fk: 'DOCUMENTOS.id_documento', descripcion: 'Referencia al documento' },
          { nombre: 'nombre_propiedad', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre de la propiedad' },
          { nombre: 'valor_propiedad', tipo: 'TEXT', pk: false, descripcion: 'Valor de la propiedad' },
          { nombre: 'tipo_dato', tipo: 'VARCHAR(20)', pk: false, descripcion: 'Tipo de dato de la propiedad' },
          { nombre: 'fecha_actualizacion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de última actualización' }
        ]
      },
      {
        nombre: 'IMAGENES',
        campos: [
          { nombre: 'id_imagen', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la imagen' },
          { nombre: 'id_documento', tipo: 'INT', pk: false, fk: 'DOCUMENTOS.id_documento', descripcion: 'Referencia al documento' },
          { nombre: 'numero_pagina', tipo: 'INT', pk: false, descripcion: 'Número de página de la imagen' },
          { nombre: 'nombre_archivo', tipo: 'VARCHAR(255)', pk: false, descripcion: 'Nombre del archivo de imagen' },
          { nombre: 'ruta_archivo', tipo: 'VARCHAR(500)', pk: false, descripcion: 'Ruta completa del archivo' },
          { nombre: 'tamaño_archivo', tipo: 'BIGINT', pk: false, descripcion: 'Tamaño del archivo en bytes' },
          { nombre: 'formato_archivo', tipo: 'VARCHAR(10)', pk: false, descripcion: 'Formato del archivo (JPG, PNG, etc.)' },
          { nombre: 'fecha_subida', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de subida del archivo' },
          { nombre: 'checksum', tipo: 'VARCHAR(64)', pk: false, descripcion: 'Checksum MD5 del archivo' }
        ]
      },
      {
        nombre: 'CACHE_CONSULTAS',
        campos: [
          { nombre: 'id_cache', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del cache' },
          { nombre: 'tipo_transaccion', tipo: 'INT', pk: false, descripcion: 'Tipo de transacción (1, 2, 3)' },
          { nombre: 'parametros_hash', tipo: 'VARCHAR(64)', pk: false, descripcion: 'Hash de los parámetros de consulta' },
          { nombre: 'resultado_xml', tipo: 'LONGTEXT', pk: false, descripcion: 'Resultado XML almacenado en cache' },
          { nombre: 'fecha_creacion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de creación del cache' },
          { nombre: 'fecha_expiracion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de expiración del cache' },
          { nombre: 'hits', tipo: 'INT', pk: false, descripcion: 'Número de veces que se ha usado este cache' }
        ]
      }
    ];
  }

  /**
   * Generar script SQL completo
   */
  generarSQL() {
    let sql = this.generarComentarios();
    sql += this.generarCrearTablas();
    sql += this.generarIndices();
    sql += this.generarDatosIniciales();
    sql += this.generarComentariosFinales();
    
    return sql;
  }

  /**
   * Generar comentarios iniciales
   */
  generarComentarios() {
    return `-- =====================================================
-- SCRIPT SQL PARA SISTEMA CRM - PROBLEMA 5
-- Integración con Sistema de Imágenes
-- =====================================================
-- 
-- Este script crea la estructura de base de datos
-- para replicar la información del sistema de imágenes
-- en el CRM, optimizando consultas y reduciendo latencia.
--
-- Generado automáticamente: ${new Date().toLocaleString('es-ES')}
-- 
-- =====================================================

`;
  }

  /**
   * Generar CREATE TABLE statements
   */
  generarCrearTablas() {
    let sql = '-- Crear tablas\n';
    
    this.tablas.forEach(tabla => {
      sql += `\n-- Tabla: ${tabla.nombre}\n`;
      sql += `CREATE TABLE ${tabla.nombre} (\n`;
      
      tabla.campos.forEach((campo, index) => {
        let campoSQL = `    ${campo.nombre} ${campo.tipo}`;
        
        if (campo.pk) {
          campoSQL += ' PRIMARY KEY';
        }
        
        if (campo.autoIncrement) {
          campoSQL += ' AUTO_INCREMENT';
        }
        
        if (campo.fk) {
          campoSQL += ` REFERENCES ${campo.fk}`;
        }
        
        if (campo.nombre === 'activo' || campo.nombre === 'obligatorio') {
          campoSQL += ' DEFAULT TRUE';
        }
        
        if (campo.nombre === 'fecha_creacion' || campo.nombre === 'fecha_subida') {
          campoSQL += ' DEFAULT CURRENT_TIMESTAMP';
        }
        
        if (campo.nombre === 'fecha_actualizacion') {
          campoSQL += ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
        }
        
        if (index < tabla.campos.length - 1) {
          campoSQL += ',';
        }
        
        sql += campoSQL + '\n';
      });
      
      sql += ');\n';
    });
    
    return sql;
  }

  /**
   * Generar índices para optimización
   */
  generarIndices() {
    return `
-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN DE CONSULTAS
-- =====================================================

-- Índices en claves foráneas
CREATE INDEX idx_expedientes_activo ON EXPEDIENTES(activo);
CREATE INDEX idx_llaves_expediente_exp ON LLAVES_EXPEDIENTE(id_expediente);
CREATE INDEX idx_categorias_exp ON CATEGORIAS(id_expediente);
CREATE INDEX idx_categorias_padre ON CATEGORIAS(categoria_padre);
CREATE INDEX idx_tipos_doc_cat ON TIPOS_DOCUMENTO(id_categoria);
CREATE INDEX idx_documentos_tipo ON DOCUMENTOS(id_tipo_doc);
CREATE INDEX idx_documentos_exp ON DOCUMENTOS(id_expediente);
CREATE INDEX idx_documentos_estado ON DOCUMENTOS(estado);
CREATE INDEX idx_llaves_doc_doc ON LLAVES_DOCUMENTO(id_documento);
CREATE INDEX idx_llaves_doc_llave ON LLAVES_DOCUMENTO(id_llave_exp);
CREATE INDEX idx_propiedades_doc ON PROPIEDADES_DOCUMENTO(id_documento);
CREATE INDEX idx_imagenes_doc ON IMAGENES(id_documento);
CREATE INDEX idx_imagenes_pagina ON IMAGENES(numero_pagina);

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_documentos_exp_tipo ON DOCUMENTOS(id_expediente, id_tipo_doc);
CREATE INDEX idx_llaves_doc_valor ON LLAVES_DOCUMENTO(valor_llave, id_llave_exp);
CREATE INDEX idx_cache_tipo_hash ON CACHE_CONSULTAS(tipo_transaccion, parametros_hash);

-- Índices de texto para búsquedas
CREATE INDEX idx_documentos_numero ON DOCUMENTOS(numero_documento);
CREATE INDEX idx_imagenes_nombre ON IMAGENES(nombre_archivo);

`;
  }

  /**
   * Generar datos iniciales
   */
  generarDatosIniciales() {
    return `-- =====================================================
-- DATOS INICIALES DE PRUEBA
-- =====================================================

-- Insertar expedientes
INSERT INTO EXPEDIENTES (nombre_expediente, descripcion, activo) VALUES
('Créditos', 'Expedientes relacionados con préstamos y créditos bancarios', TRUE),
('Ahorros', 'Expedientes relacionados con cuentas de ahorro', TRUE);

-- Insertar llaves para Créditos
INSERT INTO LLAVES_EXPEDIENTE (id_expediente, nombre_llave, tipo_dato, longitud, obligatorio) VALUES
(1, 'Cliente', 'num', 8, TRUE),
(1, 'Nombre Cliente', 'alfa', 80, TRUE),
(1, 'Fecha Vigencia', 'date', NULL, FALSE);

-- Insertar llaves para Ahorros
INSERT INTO LLAVES_EXPEDIENTE (id_expediente, nombre_llave, tipo_dato, longitud, obligatorio) VALUES
(2, 'Cuenta', 'num', 10, TRUE),
(2, 'Titular', 'alfa', 50, TRUE);

-- Insertar categorías
INSERT INTO CATEGORIAS (id_expediente, nombre_categoria, categoria_padre, nivel, activo) VALUES
(1, 'Cliente', NULL, 1, TRUE),
(1, 'Individual', 1, 2, TRUE),
(2, 'Identificación', NULL, 1, TRUE),
(2, 'Personal', 3, 2, TRUE);

-- Insertar tipos de documento
INSERT INTO TIPOS_DOCUMENTO (id_categoria, nombre_tipo, descripcion, formato_permitido, tamaño_maximo, activo) VALUES
(2, 'Cédula', 'Documento de identificación personal', 'JPG,PNG,PDF', 5, TRUE),
(2, 'Balance General', 'Documento financiero con balance general', 'PDF,JPG', 10, TRUE),
(4, 'Cédula', 'Documento de identificación personal', 'JPG,PNG,PDF', 5, TRUE),
(4, 'Pasaporte', 'Documento de identificación internacional', 'JPG,PNG,PDF', 5, TRUE);

`;
  }

  /**
   * Generar comentarios finales
   */
  generarComentariosFinales() {
    return `-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================
--
-- Este script crea una estructura completa para:
-- 1. Replicar información del sistema de imágenes
-- 2. Optimizar consultas con índices apropiados
-- 3. Mantener integridad referencial
-- 4. Permitir cache de consultas frecuentes
--
-- Beneficios:
-- - Reducción de latencia en consultas
-- - Mejor disponibilidad del sistema
-- - Optimización de recursos
-- - Escalabilidad para múltiples clientes CRM
--
-- =====================================================
`;
  }

  /**
   * Generar solo las tablas (sin datos)
   */
  generarSoloTablas() {
    let sql = this.generarComentarios();
    sql += this.generarCrearTablas();
    sql += this.generarIndices();
    sql += this.generarComentariosFinales();
    
    return sql;
  }

  /**
   * Generar solo los datos iniciales
   */
  generarSoloDatos() {
    let sql = this.generarComentarios();
    sql += this.generarDatosIniciales();
    
    return sql;
  }
}
