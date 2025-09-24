// Constantes de la aplicación
export const PROBLEMS = [
  {
    id: 1,
    title: "Divisores Primos",
    description: "Sumatoria de números divisores propios primos",
    icon: "Calculator",
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    path: "/problema-1",
    difficulty: "Medio",
    status: "completed"
  },
  {
    id: 2,
    title: "Call Center",
    description: "Sistema parametrizable de validación bancaria",
    icon: "Phone",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    path: "/problema-2",
    difficulty: "Alto",
    status: "completed"
  },
  {
    id: 3,
    title: "Vasijas",
    description: "Algoritmo de optimización de llenado",
    icon: "Beaker",
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
    path: "/problema-3",
    difficulty: "Alto",
    status: "completed"
  },
  {
    id: 4,
    title: "Gestión Proyectos",
    description: "Metodologías y mejores prácticas",
    icon: "Users",
    color: "bg-gradient-to-br from-orange-500 to-orange-700",
    path: "/problema-4",
    difficulty: "Bajo",
    status: "pending"
  },
  {
    id: 5,
    title: "Integración CRM",
    description: "Sistemas de imágenes y documentos",
    icon: "Database",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    path: "/problema-5",
    difficulty: "Alto",
    status: "completed"
  }
];

export const DIFFICULTY_COLORS = {
  'Bajo': 'text-green-600 bg-green-100',
  'Medio': 'text-yellow-600 bg-yellow-100',
  'Alto': 'text-red-600 bg-red-100'
};

export const STATUS_COLORS = {
  'pending': 'text-gray-600 bg-gray-100',
  'in-progress': 'text-blue-600 bg-blue-100',
  'completed': 'text-green-600 bg-green-100'
};
