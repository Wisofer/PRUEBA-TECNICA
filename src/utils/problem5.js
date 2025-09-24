
export class SistemaImagenes {
  constructor() {
    this.expedientes = this.initializeExpedientes();
    this.documentos = this.initializeDocumentos();
    this.imagenes = this.initializeImagenes();
  }

  initializeExpedientes() {
    return [
      {
        id: 1,
        nombre: "Créditos",
        llaves: [
          { tipo: "num", longitud: 8, nombre: "Cliente" },
          { tipo: "alfa", longitud: 80, nombre: "Nombre Cliente" },
          { tipo: "date", nombre: "Fecha Vigencia" }
        ],
        categorias: [
          {
            nombre: "Cliente",
            subcategorias: [
              {
                nombre: "Individual",
                tipos_documento: [
                  { nombre: "Cédula" },
                  { nombre: "Balance General" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        nombre: "Ahorros",
        llaves: [
          { tipo: "num", longitud: 10, nombre: "Cuenta" },
          { tipo: "alfa", longitud: 50, nombre: "Titular" }
        ],
        categorias: [
          {
            nombre: "Identificación",
            subcategorias: [
              {
                nombre: "Personal",
                tipos_documento: [
                  { nombre: "Cédula" },
                  { nombre: "Pasaporte" }
                ]
              }
            ]
          }
        ]
      }
    ];
  }

  initializeDocumentos() {
    return [
      // Cliente Juan Pérez - Créditos
      {
        id: 1234,
        tipo: "Cedula",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011134",
          "Nombre Cliente": "Juan Pérez"
        },
        propiedades: {
          "Fecha Ingreso": "01/01/2005",
          "Fecha expiración": "01/01/2006"
        }
      },
      {
        id: 12345,
        tipo: "Balance General",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011134",
          "Nombre Cliente": "Juan Pérez"
        },
        propiedades: {
          "Fecha Ingreso": "01/01/2005",
          "Fecha expiración": "01/02/2006"
        }
      },
      // Cliente María García - Créditos
      {
        id: 1235,
        tipo: "Cedula",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011135",
          "Nombre Cliente": "María García"
        },
        propiedades: {
          "Fecha Ingreso": "15/03/2005",
          "Fecha expiración": "15/03/2006"
        }
      },
      {
        id: 12346,
        tipo: "Balance General",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011135",
          "Nombre Cliente": "María García"
        },
        propiedades: {
          "Fecha Ingreso": "15/03/2005",
          "Fecha expiración": "15/04/2006"
        }
      },
      // Cliente Carlos López - Créditos
      {
        id: 1236,
        tipo: "Cedula",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011136",
          "Nombre Cliente": "Carlos López"
        },
        propiedades: {
          "Fecha Ingreso": "20/05/2005",
          "Fecha expiración": "20/05/2006"
        }
      },
      {
        id: 12347,
        tipo: "Balance General",
        expediente: "Créditos",
        llaves: {
          "Cliente": "00011136",
          "Nombre Cliente": "Carlos López"
        },
        propiedades: {
          "Fecha Ingreso": "20/05/2005",
          "Fecha expiración": "20/06/2006"
        }
      },
      // Cliente Ana Rodríguez - Ahorros
      {
        id: 2001,
        tipo: "Cedula",
        expediente: "Ahorros",
        llaves: {
          "Cuenta": "1234567890",
          "Titular": "Ana Rodríguez"
        },
        propiedades: {
          "Fecha Ingreso": "10/02/2005",
          "Fecha expiración": "10/02/2006"
        }
      },
      {
        id: 2002,
        tipo: "Pasaporte",
        expediente: "Ahorros",
        llaves: {
          "Cuenta": "1234567890",
          "Titular": "Ana Rodríguez"
        },
        propiedades: {
          "Fecha Ingreso": "10/02/2005",
          "Fecha expiración": "10/02/2010"
        }
      },
      // Cliente Roberto Silva - Ahorros
      {
        id: 2003,
        tipo: "Cedula",
        expediente: "Ahorros",
        llaves: {
          "Cuenta": "0987654321",
          "Titular": "Roberto Silva"
        },
        propiedades: {
          "Fecha Ingreso": "05/08/2005",
          "Fecha expiración": "05/08/2006"
        }
      },
      {
        id: 2004,
        tipo: "Pasaporte",
        expediente: "Ahorros",
        llaves: {
          "Cuenta": "0987654321",
          "Titular": "Roberto Silva"
        },
        propiedades: {
          "Fecha Ingreso": "05/08/2005",
          "Fecha expiración": "05/08/2010"
        }
      }
    ];
  }

  initializeImagenes() {
    return [
      // Juan Pérez - Créditos
      {
        documento_id: 1234,
        paginas: [
          { archivo: "d:\\temp\\1234_1.jpg" },
          { archivo: "d:\\temp\\1234_2.jpg" }
        ]
      },
      {
        documento_id: 12345,
        paginas: [
          { archivo: "d:\\temp\\12345_1.jpg" },
          { archivo: "d:\\temp\\12345_2.jpg" },
          { archivo: "d:\\temp\\12345_3.jpg" }
        ]
      },
      // María García - Créditos
      {
        documento_id: 1235,
        paginas: [
          { archivo: "d:\\temp\\1235_1.jpg" },
          { archivo: "d:\\temp\\1235_2.jpg" }
        ]
      },
      {
        documento_id: 12346,
        paginas: [
          { archivo: "d:\\temp\\12346_1.jpg" },
          { archivo: "d:\\temp\\12346_2.jpg" }
        ]
      },
      // Carlos López - Créditos
      {
        documento_id: 1236,
        paginas: [
          { archivo: "d:\\temp\\1236_1.jpg" },
          { archivo: "d:\\temp\\1236_2.jpg" }
        ]
      },
      {
        documento_id: 12347,
        paginas: [
          { archivo: "d:\\temp\\12347_1.jpg" },
          { archivo: "d:\\temp\\12347_2.jpg" },
          { archivo: "d:\\temp\\12347_3.jpg" }
        ]
      },
      // Ana Rodríguez - Ahorros
      {
        documento_id: 2001,
        paginas: [
          { archivo: "d:\\temp\\2001_1.jpg" },
          { archivo: "d:\\temp\\2001_2.jpg" }
        ]
      },
      {
        documento_id: 2002,
        paginas: [
          { archivo: "d:\\temp\\2002_1.jpg" },
          { archivo: "d:\\temp\\2002_2.jpg" },
          { archivo: "d:\\temp\\2002_3.jpg" },
          { archivo: "d:\\temp\\2002_4.jpg" }
        ]
      },
      // Roberto Silva - Ahorros
      {
        documento_id: 2003,
        paginas: [
          { archivo: "d:\\temp\\2003_1.jpg" },
          { archivo: "d:\\temp\\2003_2.jpg" }
        ]
      },
      {
        documento_id: 2004,
        paginas: [
          { archivo: "d:\\temp\\2004_1.jpg" },
          { archivo: "d:\\temp\\2004_2.jpg" }
        ]
      }
    ];
  }

  consultarExpediente(tipoExpediente, incluirCategorias = true) {
    const expediente = this.expedientes.find(exp => 
      exp.nombre.toLowerCase() === tipoExpediente.toLowerCase()
    );

    if (!expediente) {
      return this.generateErrorResponse(1, "Expediente no encontrado");
    }

    const response = {
      TT: 1,
      Error: { id: 0, message: "Transacción exitosa" },
      Llaves: expediente.llaves,
      Tipos_documento: incluirCategorias ? expediente.categorias : null
    };

    return this.generateXMLResponse(response);
  }

  consultarDocumentosPorLlaves(tipoExpediente, llaves, tiposDocumento) {
    const documentos = this.documentos.filter(doc => 
      doc.expediente.toLowerCase() === tipoExpediente.toLowerCase() &&
      this.matchLlaves(doc.llaves, llaves) &&
      tiposDocumento.some(tipo => doc.tipo.toLowerCase() === tipo.toLowerCase())
    );

    if (documentos.length === 0) {
      return this.generateErrorResponse(2, "No se encontraron documentos");
    }

    const response = {
      TT: 2,
      Error: { id: 0, message: "Transacción exitosa" },
      Documentos: documentos.map(doc => ({
        Llaves: doc.llaves,
        Documento: {
          tipo: doc.tipo,
          id: doc.id,
          Propiedades: doc.propiedades
        }
      }))
    };

    return this.generateXMLResponse(response);
  }

  consultarImagenesPorDocumento(directorioTemporal, documentosIds) {
    const imagenes = this.imagenes.filter(img => 
      documentosIds.includes(img.documento_id)
    );

    if (imagenes.length === 0) {
      return this.generateErrorResponse(3, "No se encontraron imágenes");
    }

    const response = {
      TT: 3,
      Error: { id: 0, message: "Transacción exitosa" },
      Documentos: imagenes.map(img => ({
        id: img.documento_id,
        Paginas: img.paginas.map(pagina => ({
          archivo: pagina.archivo.replace('d:\\temp\\', `${directorioTemporal}`)
        }))
      }))
    };

    return this.generateXMLResponse(response);
  }

  matchLlaves(llavesDoc, llavesBusqueda) {
    return Object.keys(llavesBusqueda).every(key => 
      llavesDoc[key] && llavesDoc[key].toLowerCase() === llavesBusqueda[key].toLowerCase()
    );
  }

  generateXMLResponse(data) {
    let xml = '<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>\n';
    xml += '<EXPEDIENTES.OUTPUT>\n';
    
    xml += `  <TT>${data.TT}</TT>\n`;
    xml += `  <Error id="${data.Error.id}">${data.Error.message}</Error>\n`;
    
    if (data.Llaves) {
      xml += '  <Llaves>\n';
      data.Llaves.forEach(llave => {
        xml += `    <Llave tipo="${llave.tipo}" longitud="${llave.longitud || ''}" nombre="${llave.nombre}"/>\n`;
      });
      xml += '  </Llaves>\n';
    }
    
    if (data.Tipos_documento) {
      xml += '  <Tipos_documento>\n';
      data.Tipos_documento.forEach(categoria => {
        xml += `    <Categoria nombre="${categoria.nombre}">\n`;
        categoria.subcategorias.forEach(subcat => {
          xml += `      <Categoria nombre="${subcat.nombre}">\n`;
          subcat.tipos_documento.forEach(tipo => {
            xml += `        <Tipo_documento nombre="${tipo.nombre}"/>\n`;
          });
          xml += '      </Categoria>\n';
        });
        xml += '    </Categoria>\n';
      });
      xml += '  </Tipos_documento>\n';
    }
    
    if (data.Documentos) {
      xml += '  <Documentos>\n';
      data.Documentos.forEach(doc => {
        if (doc.Llaves) {
          xml += '    <Llaves>\n';
          Object.entries(doc.Llaves).forEach(([nombre, valor]) => {
            xml += `      <Llave nombre="${nombre}" valor="${valor}"/>\n`;
          });
          xml += '    </Llaves>\n';
        }
        
        if (doc.Documento) {
          xml += `    <Documento tipo="${doc.Documento.tipo}" id="${doc.Documento.id}">\n`;
          
          // Para transacción 2: propiedades del documento
          if (doc.Documento.Propiedades) {
            Object.entries(doc.Documento.Propiedades).forEach(([nombre, valor]) => {
              xml += `      <Propiedad nombre="${nombre}" valor="${valor}"/>\n`;
            });
          }
          
          // Para transacción 3: páginas de imágenes
          if (doc.Documento.Paginas) {
            doc.Documento.Paginas.forEach(pagina => {
              xml += `      <Pagina archivo="${pagina.archivo}"/>\n`;
            });
          }
          
          xml += '    </Documento>\n';
        } else {
          // Para transacción 3: estructura directa
          xml += `    <Documento id="${doc.id}">\n`;
          if (doc.Paginas) {
            doc.Paginas.forEach(pagina => {
              xml += `      <Pagina archivo="${pagina.archivo}"/>\n`;
            });
          }
          xml += '    </Documento>\n';
        }
      });
      xml += '  </Documentos>\n';
    }
    
    xml += '</EXPEDIENTES.OUTPUT>';
    return xml;
  }

  generateErrorResponse(tt, message) {
    return `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<EXPEDIENTES.OUTPUT>
  <TT>${tt}</TT>
  <Error id="1">${message}</Error>
</EXPEDIENTES.OUTPUT>`;
  }
}

export const estructuraComunicacion = {
  arquitectura: {
    tipo: "Arquitectura de Microservicios",
    patron: "API Gateway + Service Mesh",
    protocolo: "HTTP/HTTPS con XML",
    formato: "XML estructurado con validación XSD"
  },

  // Documentación de decisiones arquitectónicas
  decisionesArquitectura: {
    "Microservicios vs Monolito": {
      decision: "Microservicios",
      razon: "Permite escalabilidad independiente y mantenimiento aislado de cada sistema",
      impacto: "Mayor complejidad operacional pero mejor flexibilidad",
      alternativas: "Monolito integrado, pero se prefiere separación de responsabilidades"
    },
    "API Gateway vs Comunicación Directa": {
      decision: "API Gateway",
      razon: "Centraliza autenticación, logging, rate limiting y balanceo de carga",
      impacto: "Punto único de falla pero simplifica la gestión de seguridad",
      alternativas: "Comunicación directa, pero se prefiere control centralizado"
    },
    "XML vs JSON": {
      decision: "XML",
      razon: "Sistema de imágenes ya implementado con XML, mantiene compatibilidad",
      impacto: "Mayor overhead pero mejor validación con XSD",
      alternativas: "JSON sería más eficiente, pero requiere migración del sistema existente"
    },
    "Base de Datos Replicada vs API Calls": {
      decision: "Base de Datos Replicada",
      razon: "Reduce latencia y dependencia de red para consultas frecuentes",
      impacto: "Mayor complejidad de sincronización pero mejor performance",
      alternativas: "Solo API calls, pero se prefiere optimización de performance"
    }
  },
  
  componentes: [
    {
      nombre: "CRM System",
      rol: "Cliente/Solicitante",
      responsabilidades: [
        "Generar solicitudes XML",
        "Procesar respuestas del sistema de imágenes",
        "Manejar cache local de datos",
        "Gestionar sesiones de usuario"
      ]
    },
    {
      nombre: "API Gateway",
      rol: "Intermediario",
      responsabilidades: [
        "Validar autenticación",
        "Rate limiting",
        "Logging de transacciones",
        "Balanceo de carga"
      ]
    },
    {
      nombre: "Sistema de Imágenes",
      rol: "Servidor/Proveedor",
      responsabilidades: [
        "Procesar transacciones XML",
        "Consultar base de datos",
        "Generar respuestas XML",
        "Manejar archivos temporales"
      ]
    }
  ],
  
  flujoComunicacion: [
    "1. CRM genera solicitud XML",
    "2. API Gateway valida y enruta",
    "3. Sistema de Imágenes procesa",
    "4. Respuesta XML retornada",
    "5. CRM procesa respuesta"
  ],
  
  consideracionesTecnicas: [
    "Timeout configurable por transacción",
    "Retry automático con backoff exponencial",
    "Compresión de respuestas grandes",
    "Cache de consultas frecuentes",
    "Monitoreo de performance",
    "Auditoría de transacciones"
  ]
};

export const casosPrueba = [
  {
    id: 1,
    nombre: "Consulta Expediente - Créditos",
    transaccion: 1,
    entrada: {
      tipoExpediente: "Créditos",
      incluirCategorias: true
    },
    esperado: "Estructura completa con llaves y tipos de documento"
  },
  {
    id: 2,
    nombre: "Búsqueda por Cliente",
    transaccion: 2,
    entrada: {
      tipoExpediente: "Créditos",
      llaves: {
        "Cliente": "00011134",
        "Nombre Cliente": "Juan Pérez"
      },
      tiposDocumento: ["cédula", "Balance General"]
    },
    esperado: "Documentos del cliente Juan Pérez"
  },
  {
    id: 3,
    nombre: "Obtención de Imágenes",
    transaccion: 3,
    entrada: {
      directorioTemporal: "d:\\temp\\",
      documentosIds: [1234, 1235]
    },
    esperado: "Rutas de archivos de imágenes"
  }
];
