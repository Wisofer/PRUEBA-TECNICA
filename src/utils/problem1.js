export function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

export function findProperDivisors(num) {
  if (num <= 1) return [];
  
  const divisors = [];
  
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      if (i !== num) divisors.push(i);
      const complement = num / i;
      if (complement !== i && complement !== num) {
        divisors.push(complement);
      }
    }
  }
  
  return divisors.sort((a, b) => a - b);
}

export function filterPrimeDivisors(divisors) {
  return divisors.filter(isPrime);
}

export function sumPrimeDivisors(num) {
  const startTime = performance.now();
  const auditLog = {
    timestamp: new Date().toISOString(),
    input: num,
    operation: 'sumPrimeDivisors',
    steps: [],
    performance: {},
    decisions: []
  };

  if (!Number.isInteger(num) || num <= 0) {
    auditLog.steps.push(`Validación fallida: ${num} no es un entero positivo`);
    auditLog.decisions.push("Rechazar entrada inválida según especificación");
    
    return {
      input: num,
      isValid: false,
      error: "El número debe ser un entero positivo mayor a 0",
      properDivisors: [],
      primeDivisors: [],
      sum: 0,
      steps: [],
      auditLog
    };
  }

  auditLog.steps.push(`Inicio: Procesando número ${num}`);
  auditLog.decisions.push("Entrada válida, proceder con algoritmo");
  
  const steps = [];
  steps.push(`Paso 1: Encontrar divisores propios de ${num}`);
  auditLog.steps.push("Iniciando búsqueda de divisores propios");
  const properDivisors = findProperDivisors(num);
  steps.push(`Divisores propios: [${properDivisors.join(", ")}]`);
  auditLog.steps.push(`Divisores encontrados: ${properDivisors.length} elementos`);
  auditLog.decisions.push(`Usar algoritmo O(√n) para eficiencia`);
  
  steps.push(`Paso 2: Filtrar divisores que son primos`);
  auditLog.steps.push("Iniciando verificación de primalidad");
  const primeDivisors = filterPrimeDivisors(properDivisors);
  
  properDivisors.forEach(div => {
    const isP = isPrime(div);
    steps.push(`${div} es ${isP ? 'primo' : 'no primo'}`);
    auditLog.steps.push(`Verificación primalidad ${div}: ${isP ? 'PRIMO' : 'NO PRIMO'}`);
  });
  
  steps.push(`Divisores primos: [${primeDivisors.join(", ")}]`);
  auditLog.steps.push(`Divisores primos identificados: ${primeDivisors.length}`);
  
  const sum = primeDivisors.reduce((acc, curr) => acc + curr, 0);
  steps.push(`Paso 3: Sumar divisores primos`);
  auditLog.steps.push(`Suma calculada: ${sum}`);
  
  if (primeDivisors.length > 0) {
    steps.push(`Suma: ${primeDivisors.join(" + ")} = ${sum}`);
    auditLog.decisions.push(`Resultado: ${primeDivisors.join(" + ")} = ${sum}`);
  } else {
    steps.push(`No hay divisores primos, suma = 0`);
    auditLog.decisions.push("No hay divisores primos, resultado = 0");
  }

  const endTime = performance.now();
  auditLog.performance = {
    executionTime: `${(endTime - startTime).toFixed(3)}ms`,
    memoryUsage: `${Math.round(process.memoryUsage?.().heapUsed / 1024 / 1024) || 'N/A'}MB`,
    operationsCount: properDivisors.length + primeDivisors.length + 1
  };

  auditLog.steps.push(`Proceso completado en ${auditLog.performance.executionTime}`);

  return {
    input: num,
    isValid: true,
    error: null,
    properDivisors,
    primeDivisors,
    sum,
    steps,
    auditLog
  };
}

export const testCases = [
  {
    input: 45,
    expectedSum: 8,
    description: "Caso del ejemplo: 45 → divisores [1,3,5,9,15] → primos [3,5] → suma 8"
  },
  {
    input: 12,
    expectedSum: 5,
    description: "12 → divisores [1,2,3,4,6] → primos [2,3] → suma 5"
  },
  {
    input: 30,
    expectedSum: 10,
    description: "30 → divisores [1,2,3,5,6,10,15] → primos [2,3,5] → suma 10"
  },
  {
    input: 7,
    expectedSum: 0,
    description: "7 → divisores [1] → primos [] → suma 0 (1 no es primo según matemáticas estándar)"
  },
  {
    input: 13,
    expectedSum: 0,
    description: "13 → divisores [1] → primos [] → suma 0 (1 no es primo según matemáticas estándar)"
  },
  {
    input: 1,
    expectedSum: 0,
    description: "1 → no tiene divisores propios → suma 0"
  }
];

export function runAllTests() {
  return testCases.map(testCase => {
    const result = sumPrimeDivisors(testCase.input);
    return {
      ...testCase,
      result,
      passed: result.sum === testCase.expectedSum
    };
  });
}
