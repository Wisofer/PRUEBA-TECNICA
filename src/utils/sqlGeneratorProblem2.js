/**
 * Generador de SQL para el diagrama ER del Problema 2 - Call Center
 * Genera scripts SQL para crear las tablas del sistema de validación parametrizable
 */

export class SQLGeneratorProblem2 {
  constructor() {
    this.tablas = this.definirTablas();
  }

  /**
   * Definir estructura de tablas para Call Center
   */
  definirTablas() {
    return [
      {
        nombre: 'BANCOS',
        campos: [
          { nombre: 'id_banco', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del banco' },
          { nombre: 'nombre_banco', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre del banco' },
          { nombre: 'codigo_banco', tipo: 'VARCHAR(10)', pk: false, descripcion: 'Código único del banco' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo del banco' }
        ]
      },
      {
        nombre: 'TIPOS_CLIENTE',
        campos: [
          { nombre: 'id_tipo', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del tipo de cliente' },
          { nombre: 'nombre_tipo', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Nombre del tipo de cliente' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción del tipo de cliente' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'TIPOS_CUENTA',
        campos: [
          { nombre: 'id_tipo_cuenta', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del tipo de cuenta' },
          { nombre: 'nombre_tipo', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Nombre del tipo de cuenta' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción del tipo de cuenta' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'TIPOS_VALIDACION',
        campos: [
          { nombre: 'id_validacion', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del tipo de validación' },
          { nombre: 'nombre_validacion', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Nombre del tipo de validación' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción del tipo de validación' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'DATOS_REQUERIDOS',
        campos: [
          { nombre: 'id_dato', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del dato requerido' },
          { nombre: 'nombre_dato', tipo: 'VARCHAR(100)', pk: false, descripcion: 'Nombre del dato requerido' },
          { nombre: 'tipo_dato', tipo: 'VARCHAR(20)', pk: false, descripcion: 'Tipo de dato (texto, numérico, fecha, etc.)' },
          { nombre: 'obligatorio', tipo: 'BOOLEAN', pk: false, descripcion: 'Si el dato es obligatorio por defecto' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'CONFIGURACIONES',
        campos: [
          { nombre: 'id_config', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la configuración' },
          { nombre: 'id_banco', tipo: 'INT', pk: false, fk: 'BANCOS.id_banco', descripcion: 'Referencia al banco' },
          { nombre: 'id_tipo_cliente', tipo: 'INT', pk: false, fk: 'TIPOS_CLIENTE.id_tipo', descripcion: 'Referencia al tipo de cliente' },
          { nombre: 'id_tipo_cuenta', tipo: 'INT', pk: false, fk: 'TIPOS_CUENTA.id_tipo_cuenta', descripcion: 'Referencia al tipo de cuenta' },
          { nombre: 'id_validacion', tipo: 'INT', pk: false, fk: 'TIPOS_VALIDACION.id_validacion', descripcion: 'Referencia al tipo de validación' },
          { nombre: 'umbral_minimo', tipo: 'INT', pk: false, descripcion: 'Número mínimo de datos que debe contestar correctamente' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo de la configuración' }
        ]
      },
      {
        nombre: 'CONFIG_DATOS',
        campos: [
          { nombre: 'id_config_dato', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la configuración de dato' },
          { nombre: 'id_config', tipo: 'INT', pk: false, fk: 'CONFIGURACIONES.id_config', descripcion: 'Referencia a la configuración' },
          { nombre: 'id_dato', tipo: 'INT', pk: false, fk: 'DATOS_REQUERIDOS.id_dato', descripcion: 'Referencia al dato requerido' },
          { nombre: 'orden', tipo: 'INT', pk: false, descripcion: 'Orden de solicitud del dato' },
          { nombre: 'activo', tipo: 'BOOLEAN', pk: false, descripcion: 'Estado activo/inactivo' }
        ]
      },
      {
        nombre: 'INTENTOS_VALIDACION',
        campos: [
          { nombre: 'id_intento', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único del intento de validación' },
          { nombre: 'id_config', tipo: 'INT', pk: false, fk: 'CONFIGURACIONES.id_config', descripcion: 'Referencia a la configuración utilizada' },
          { nombre: 'fecha_intento', tipo: 'DATETIME', pk: false, descripcion: 'Fecha y hora del intento' },
          { nombre: 'ip_cliente', tipo: 'VARCHAR(45)', pk: false, descripcion: 'Dirección IP del cliente' },
          { nombre: 'exitoso', tipo: 'BOOLEAN', pk: false, descripcion: 'Si el intento fue exitoso' },
          { nombre: 'observaciones', tipo: 'TEXT', pk: false, descripcion: 'Observaciones del intento' }
        ]
      },
      {
        nombre: 'RESPUESTAS_CLIENTE',
        campos: [
          { nombre: 'id_respuesta', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la respuesta' },
          { nombre: 'id_intento', tipo: 'INT', pk: false, fk: 'INTENTOS_VALIDACION.id_intento', descripcion: 'Referencia al intento de validación' },
          { nombre: 'id_dato', tipo: 'INT', pk: false, fk: 'DATOS_REQUERIDOS.id_dato', descripcion: 'Referencia al dato solicitado' },
          { nombre: 'valor_respuesta', tipo: 'TEXT', pk: false, descripcion: 'Valor proporcionado por el cliente' },
          { nombre: 'correcta', tipo: 'BOOLEAN', pk: false, descripcion: 'Si la respuesta es correcta' },
          { nombre: 'fecha_respuesta', tipo: 'DATETIME', pk: false, descripcion: 'Fecha y hora de la respuesta' }
        ]
      },
      {
        nombre: 'GESTIONES_INTERNAS',
        campos: [
          { nombre: 'id_gestion', tipo: 'INT', pk: true, autoIncrement: true, descripcion: 'Identificador único de la gestión' },
          { nombre: 'id_intento', tipo: 'INT', pk: false, fk: 'INTENTOS_VALIDACION.id_intento', descripcion: 'Referencia al intento de validación' },
          { nombre: 'tipo_gestion', tipo: 'VARCHAR(50)', pk: false, descripcion: 'Tipo de gestión interna' },
          { nombre: 'descripcion', tipo: 'TEXT', pk: false, descripcion: 'Descripción de la gestión' },
          { nombre: 'estado', tipo: 'VARCHAR(20)', pk: false, descripcion: 'Estado de la gestión' },
          { nombre: 'fecha_creacion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de creación de la gestión' },
          { nombre: 'fecha_resolucion', tipo: 'DATETIME', pk: false, descripcion: 'Fecha de resolución de la gestión' }
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
-- SCRIPT SQL PARA SISTEMA CALL CENTER - PROBLEMA 2
-- Sistema Parametrizable de Validación de Seguridad
-- =====================================================
-- 
-- Este script crea la estructura de base de datos
-- para un sistema de call center bancario con validación
-- parametrizable de seguridad por banco, tipo de cliente
-- y tipo de cuenta.
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
        
        if (campo.nombre === 'activo' || campo.nombre === 'obligatorio' || campo.nombre === 'exitoso' || campo.nombre === 'correcta') {
          campoSQL += ' DEFAULT TRUE';
        }
        
        if (campo.nombre === 'fecha_intento' || campo.nombre === 'fecha_creacion' || campo.nombre === 'fecha_respuesta') {
          campoSQL += ' DEFAULT CURRENT_TIMESTAMP';
        }
        
        if (campo.nombre === 'fecha_resolucion') {
          campoSQL += ' DEFAULT NULL';
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
CREATE INDEX idx_configuraciones_banco ON CONFIGURACIONES(id_banco);
CREATE INDEX idx_configuraciones_tipo_cliente ON CONFIGURACIONES(id_tipo_cliente);
CREATE INDEX idx_configuraciones_tipo_cuenta ON CONFIGURACIONES(id_tipo_cuenta);
CREATE INDEX idx_configuraciones_validacion ON CONFIGURACIONES(id_validacion);
CREATE INDEX idx_config_datos_config ON CONFIG_DATOS(id_config);
CREATE INDEX idx_config_datos_dato ON CONFIG_DATOS(id_dato);
CREATE INDEX idx_intentos_config ON INTENTOS_VALIDACION(id_config);
CREATE INDEX idx_respuestas_intento ON RESPUESTAS_CLIENTE(id_intento);
CREATE INDEX idx_respuestas_dato ON RESPUESTAS_CLIENTE(id_dato);
CREATE INDEX idx_gestiones_intento ON GESTIONES_INTERNAS(id_intento);

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_configuraciones_completa ON CONFIGURACIONES(id_banco, id_tipo_cliente, id_tipo_cuenta, id_validacion);
CREATE INDEX idx_intentos_fecha ON INTENTOS_VALIDACION(fecha_intento, exitoso);
CREATE INDEX idx_respuestas_fecha ON RESPUESTAS_CLIENTE(fecha_respuesta, correcta);
CREATE INDEX idx_gestiones_estado ON GESTIONES_INTERNAS(estado, fecha_creacion);

-- Índices de búsqueda
CREATE INDEX idx_bancos_codigo ON BANCOS(codigo_banco);
CREATE INDEX idx_intentos_ip ON INTENTOS_VALIDACION(ip_cliente);
CREATE INDEX idx_gestiones_tipo ON GESTIONES_INTERNAS(tipo_gestion);

`;
  }

  /**
   * Generar datos iniciales
   */
  generarDatosIniciales() {
    return `-- =====================================================
-- DATOS INICIALES DE PRUEBA
-- =====================================================

-- Insertar bancos
INSERT INTO BANCOS (nombre_banco, codigo_banco, activo) VALUES
('Banco de los Amigos', 'BDA001', TRUE),
('Banco Nacional', 'BN001', TRUE),
('Banco Popular', 'BP001', TRUE);

-- Insertar tipos de cliente
INSERT INTO TIPOS_CLIENTE (nombre_tipo, descripcion, activo) VALUES
('Individual', 'Clientes personas naturales', TRUE),
('Empresarial', 'Clientes empresas y corporaciones', TRUE),
('Potencial Individual', 'Clientes potenciales personas naturales', TRUE),
('Potencial Empresarial', 'Clientes potenciales empresas', TRUE),
('Estado Cuenta', 'Consulta de estados de cuenta', TRUE);

-- Insertar tipos de cuenta
INSERT INTO TIPOS_CUENTA (nombre_tipo, descripcion, activo) VALUES
('Monetarios', 'Cuentas corrientes', TRUE),
('Ahorros', 'Cuentas de ahorro', TRUE),
('Tarjeta de Crédito', 'Productos crediticios', TRUE),
('Fondos de Pensión', 'Productos de pensión', TRUE);

-- Insertar tipos de validación
INSERT INTO TIPOS_VALIDACION (nombre_validacion, descripcion, activo) VALUES
('Validación Estándar', 'Validación básica de seguridad', TRUE),
('Validación Reforzada', 'Validación con mayor seguridad', TRUE),
('Validación Express', 'Validación rápida para casos urgentes', TRUE);

-- Insertar datos requeridos
INSERT INTO DATOS_REQUERIDOS (nombre_dato, tipo_dato, obligatorio, activo) VALUES
('Dirección', 'texto', TRUE, TRUE),
('Teléfono de casa', 'texto', TRUE, TRUE),
('Teléfono de oficina', 'texto', FALSE, TRUE),
('Fecha de nacimiento', 'fecha', TRUE, TRUE),
('Número de cédula', 'texto', TRUE, TRUE),
('Número de NIT', 'texto', TRUE, TRUE),
('Razón social', 'texto', TRUE, TRUE),
('Nombre del gerente', 'texto', TRUE, TRUE),
('Dirección de la empresa', 'texto', TRUE, TRUE),
('Teléfono de la empresa', 'texto', TRUE, TRUE);

-- Configuración para Banco de los Amigos - Cliente Individual
INSERT INTO CONFIGURACIONES (id_banco, id_tipo_cliente, id_tipo_cuenta, id_validacion, umbral_minimo, activo) VALUES
(1, 1, 1, 1, 3, TRUE),  -- Monetarios: 3 de 5 datos
(1, 1, 2, 1, 3, TRUE),  -- Ahorros: 3 de 5 datos
(1, 1, 3, 1, 3, TRUE),  -- Tarjeta: 3 de 5 datos
(1, 1, 4, 1, 3, TRUE);  -- Pensión: 3 de 5 datos

-- Configuración para Banco de los Amigos - Cliente Empresarial
INSERT INTO CONFIGURACIONES (id_banco, id_tipo_cliente, id_tipo_cuenta, id_validacion, umbral_minimo, activo) VALUES
(1, 2, 1, 1, 5, TRUE),  -- Monetarios: 5 de 5 datos
(1, 2, 2, 1, 5, TRUE),  -- Ahorros: 5 de 5 datos
(1, 2, 3, 1, 5, TRUE),  -- Tarjeta: 5 de 5 datos
(1, 2, 4, 1, 5, TRUE);  -- Pensión: 5 de 5 datos

-- Configurar datos para Cliente Individual - Monetarios
INSERT INTO CONFIG_DATOS (id_config, id_dato, orden, activo) VALUES
(1, 1, 1, TRUE),  -- Dirección
(1, 2, 2, TRUE),  -- Teléfono de casa
(1, 3, 3, TRUE),  -- Teléfono de oficina
(1, 4, 4, TRUE),  -- Fecha de nacimiento
(1, 5, 5, TRUE);  -- Número de cédula

-- Configurar datos para Cliente Empresarial - Monetarios
INSERT INTO CONFIG_DATOS (id_config, id_dato, orden, activo) VALUES
(5, 6, 1, TRUE),  -- Número de NIT
(5, 7, 2, TRUE),  -- Razón social
(5, 8, 3, TRUE),  -- Nombre del gerente
(5, 9, 4, TRUE),  -- Dirección de la empresa
(5, 10, 5, TRUE); -- Teléfono de la empresa

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
-- 1. Configuración parametrizable por banco
-- 2. Múltiples tipos de cliente y cuenta
-- 3. Validación dinámica de datos de seguridad
-- 4. Auditoría completa de intentos y respuestas
-- 5. Gestión interna de tickets y problemas
--
-- Beneficios:
-- - Flexibilidad total en configuración
-- - Escalabilidad para múltiples bancos
-- - Auditoría completa de seguridad
-- - Gestión eficiente de problemas
-- - Cumplimiento de regulaciones bancarias
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
