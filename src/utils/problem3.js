export class EstadoVasijas {
  constructor(a = 0, b = 0, c = 0, capacidades = [3, 4, 5]) {
    this.vasijas = {
      A: { contenido: a, capacidad: capacidades[0] },
      B: { contenido: b, capacidad: capacidades[1] },
      C: { contenido: c, capacidad: capacidades[2] }
    };
  }

  getKey() {
    return `${this.vasijas.A.contenido},${this.vasijas.B.contenido},${this.vasijas.C.contenido}`;
  }

  isVasijaALlena() {
    return this.vasijas.A.contenido === this.vasijas.A.capacidad;
  }

  clone() {
    return new EstadoVasijas(
      this.vasijas.A.contenido,
      this.vasijas.B.contenido,
      this.vasijas.C.contenido,
      [this.vasijas.A.capacidad, this.vasijas.B.capacidad, this.vasijas.C.capacidad]
    );
  }

  toString() {
    return `A:${this.vasijas.A.contenido}/${this.vasijas.A.capacidad} B:${this.vasijas.B.contenido}/${this.vasijas.B.capacidad} C:${this.vasijas.C.contenido}/${this.vasijas.C.capacidad}`;
  }
}

export class Operacion {
  constructor(tipo, origen, destino, cantidad = 0) {
    this.tipo = tipo;
    this.origen = origen;
    this.destino = destino;
    this.cantidad = cantidad;
    this.descripcion = this.generarDescripcion();
  }

  generarDescripcion() {
    switch (this.tipo) {
      case 'transferir':
        return `Transferir ${this.cantidad} galones de vasija ${this.origen} a vasija ${this.destino}`;
      case 'vaciar':
        return `Vaciar vasija ${this.origen}`;
      case 'llenar':
        return `Llenar vasija ${this.origen}`;
      default:
        return 'Operación desconocida';
    }
  }
}

export class VasijaSolver {
  constructor(capacidades = [3, 4, 5]) {
    this.capacidades = capacidades;
    this.operacionesPermitidas = [
      { origen: 'B', destino: 'A' },
      { origen: 'C', destino: 'B' }
    ];
  }

  resolver() {
    const startTime = performance.now();
    const performanceMetrics = {
      estadosExplorados: 0,
      operacionesGeneradas: 0,
      estadosVisitados: 0,
      maxProfundidad: 0,
      tiempoEjecucion: 0,
      memoriaUtilizada: 0
    };

    if (this.capacidades[0] === 0) {
      performanceMetrics.tiempoEjecucion = performance.now() - startTime;
      return {
        exito: false,
        pasos: [],
        estadoFinal: null,
        nivel: 0,
        totalOperaciones: 0,
        mensaje: 'La vasija A tiene capacidad 0, no se puede llenar',
        performanceMetrics
      };
    }

    const vasijasConCapacidad = this.capacidades.filter(cap => cap > 0).length;
    if (vasijasConCapacidad < 2) {
      performanceMetrics.tiempoEjecucion = performance.now() - startTime;
      return {
        exito: false,
        pasos: [],
        estadoFinal: null,
        nivel: 0,
        totalOperaciones: 0,
        mensaje: 'Se necesitan al menos 2 vasijas con capacidad > 0 para resolver el problema',
        performanceMetrics
      };
    }

    const estadoInicial = new EstadoVasijas(0, 0, 0, this.capacidades);
    const cola = [{ estado: estadoInicial, pasos: [], nivel: 0 }];
    const visitados = new Set();
    const maxNivel = 20;

    while (cola.length > 0) {
      const { estado, pasos, nivel } = cola.shift();
      performanceMetrics.estadosExplorados++;

      if (nivel > performanceMetrics.maxProfundidad) {
        performanceMetrics.maxProfundidad = nivel;
      }

      if (estado.isVasijaALlena()) {
        performanceMetrics.tiempoEjecucion = performance.now() - startTime;
        performanceMetrics.memoriaUtilizada = 'N/A (Browser environment)';
        
        return {
          exito: true,
          pasos: pasos,
          estadoFinal: estado,
          nivel: nivel,
          totalOperaciones: pasos.length,
          performanceMetrics
        };
      }

      if (nivel >= maxNivel) {
        continue;
      }

      const operacionesPosibles = this.generarOperaciones(estado);
      performanceMetrics.operacionesGeneradas += operacionesPosibles.length;

      for (const operacion of operacionesPosibles) {
        const nuevoEstado = this.aplicarOperacion(estado, operacion);
        const claveEstado = nuevoEstado.getKey();

        if (!visitados.has(claveEstado)) {
          visitados.add(claveEstado);
          performanceMetrics.estadosVisitados++;
          cola.push({
            estado: nuevoEstado,
            pasos: [...pasos, operacion],
            nivel: nivel + 1
          });
        }
      }
    }

    performanceMetrics.tiempoEjecucion = performance.now() - startTime;
    performanceMetrics.memoriaUtilizada = Math.round((performance.memory?.usedJSHeapSize / 1024 / 1024) || 0);

    return {
      exito: false,
      pasos: [],
      estadoFinal: null,
      nivel: 0,
      totalOperaciones: 0,
      mensaje: 'No se encontró solución en el límite de operaciones',
      performanceMetrics
    };
  }

  generarOperaciones(estado) {
    const operaciones = [];

    const eficienciaC = this.calcularEficienciaC();
    const eficienciaB = this.calcularEficienciaB();
    const usarC = eficienciaC < eficienciaB;

    if (usarC) {
      if (estado.vasijas.C.capacidad > 0 && estado.vasijas.C.contenido < estado.vasijas.C.capacidad) {
        operaciones.push(new Operacion('llenar', 'C', null, estado.vasijas.C.capacidad - estado.vasijas.C.contenido));
      }
    } else {
      for (const vasija of ['B', 'C']) {
        if (estado.vasijas[vasija].capacidad > 0 && estado.vasijas[vasija].contenido < estado.vasijas[vasija].capacidad) {
          operaciones.push(new Operacion('llenar', vasija, null, estado.vasijas[vasija].capacidad - estado.vasijas[vasija].contenido));
        }
      }
    }

    for (const { origen, destino } of this.operacionesPermitidas) {
      if (estado.vasijas[origen].capacidad > 0 && estado.vasijas[destino].capacidad > 0 &&
          estado.vasijas[origen].contenido > 0 && estado.vasijas[destino].contenido < estado.vasijas[destino].capacidad) {
        const cantidadTransferible = this.calcularTransferencia(estado, origen, destino);
        if (cantidadTransferible > 0) {
          operaciones.push(new Operacion('transferir', origen, destino, cantidadTransferible));
        }
      }
    }

    for (const vasija of ['A', 'B', 'C']) {
      if (estado.vasijas[vasija].contenido > 0) {
        if (vasija !== 'A' || estado.vasijas[vasija].contenido < estado.vasijas[vasija].capacidad) {
          operaciones.push(new Operacion('vaciar', vasija, null, estado.vasijas[vasija].contenido));
        }
      }
    }

    return operaciones;
  }

  calcularTransferencia(estado, origen, destino) {
    const contenidoOrigen = estado.vasijas[origen].contenido;
    const capacidadDestino = estado.vasijas[destino].capacidad;
    const contenidoDestino = estado.vasijas[destino].contenido;
    const espacioDisponible = capacidadDestino - contenidoDestino;

    if (origen === 'B' && destino === 'A') {
      return Math.min(contenidoOrigen, espacioDisponible);
    }

    const contenidoTotal = contenidoOrigen + contenidoDestino;
    if (contenidoTotal > capacidadDestino) {
      return espacioDisponible;
    } else {
      return contenidoOrigen;
    }
  }

  aplicarOperacion(estado, operacion) {
    const nuevoEstado = estado.clone();

    switch (operacion.tipo) {
      case 'transferir':
        nuevoEstado.vasijas[operacion.origen].contenido -= operacion.cantidad;
        nuevoEstado.vasijas[operacion.destino].contenido += operacion.cantidad;
        break;
      case 'vaciar':
        nuevoEstado.vasijas[operacion.origen].contenido = 0;
        break;
      case 'llenar':
        nuevoEstado.vasijas[operacion.origen].contenido = nuevoEstado.vasijas[operacion.origen].capacidad;
        break;
    }

    return nuevoEstado;
  }

  async simularSolucion(pasos, onStep, delay = 1000) {
    const estadoInicial = new EstadoVasijas(0, 0, 0, this.capacidades);
    let estadoActual = estadoInicial;

    for (let i = 0; i < pasos.length; i++) {
      const operacion = pasos[i];
      estadoActual = this.aplicarOperacion(estadoActual, operacion);
      
      await onStep(i + 1, operacion, estadoActual);
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return estadoActual;
  }

  analizarEficiencia(pasos) {
    const estadisticas = {
      totalOperaciones: pasos.length,
      operacionesTransferencia: pasos.filter(p => p.tipo === 'transferir').length,
      operacionesVaciado: pasos.filter(p => p.tipo === 'vaciar').length,
      aguaTransferida: pasos.filter(p => p.tipo === 'transferir').reduce((sum, p) => sum + p.cantidad, 0),
      eficiencia: 0
    };

    const aguaObjetivo = this.capacidades[0];
    estadisticas.eficiencia = (aguaObjetivo / estadisticas.totalOperaciones) * 100;

    return estadisticas;
  }

  calcularEficienciaB() {
    const capacidadA = this.capacidades[0];
    const capacidadB = this.capacidades[1];
    
    if (capacidadB === 0) return Infinity;
    
    const ciclosNecesarios = Math.ceil(capacidadA / capacidadB);
    return ciclosNecesarios * 2;
  }

  calcularEficienciaC() {
    const capacidadA = this.capacidades[0];
    const capacidadB = this.capacidades[1];
    const capacidadC = this.capacidades[2];
    
    if (capacidadC === 0 || capacidadB === 0) return Infinity;
    
    if (capacidadC >= capacidadB) {
      return 3;
    } else {
      return Infinity;
    }
  }
}

export const casosPrueba = [
  {
    nombre: "Caso Original",
    capacidades: [3, 4, 5],
    objetivo: "Llenar vasija A (3 galones)",
    descripcion: "Problema original con capacidades 3, 4, 5"
  },
  {
    nombre: "Caso Pequeño",
    capacidades: [2, 3, 4],
    objetivo: "Llenar vasija A (2 galones)",
    descripcion: "Versión simplificada para pruebas rápidas"
  },
  {
    nombre: "Caso Grande",
    capacidades: [5, 7, 9],
    objetivo: "Llenar vasija A (5 galones)",
    descripcion: "Versión más compleja para probar escalabilidad"
  }
];

export function ejecutarCasosPrueba() {
  return casosPrueba.map(caso => {
    const solver = new VasijaSolver(caso.capacidades);
    const resultado = solver.resolver();
    const estadisticas = resultado.exito ? solver.analizarEficiencia(resultado.pasos) : null;

    return {
      ...caso,
      resultado,
      estadisticas,
      exito: resultado.exito
    };
  });
}
