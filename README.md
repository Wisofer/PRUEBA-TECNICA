# 🚀 Prueba Técnica - Sistema de Evaluación

Una aplicación web moderna desarrollada en React que implementa 5 problemas de programación con simuladores interactivos, análisis de algoritmos y visualizaciones avanzadas.

## 📋 Tabla de Contenidos

- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Problemas Implementados](#-problemas-implementados)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Características](#-características)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)

## 🖥️ Requisitos del Sistema

### Requisitos Mínimos
- **Node.js**: Versión 18.0.0 o superior
- **NPM**: Versión 8.0.0 o superior (incluido con Node.js)
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: Mínimo 4GB (recomendado 8GB)
- **Espacio en disco**: 500MB libres

### Verificar Instalación
```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.0.0 o superior

# Verificar NPM
npm --version
# Debe mostrar: 8.0.0 o superior
```

## 📦 Instalación

### Paso 1: Instalar Node.js

#### Windows
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support)
3. Ejecuta el instalador `.msi`
4. Sigue las instrucciones del asistente
5. Reinicia tu terminal/command prompt

#### macOS
```bash
# Usando Homebrew (recomendado)
brew install node

# O descarga desde nodejs.org
# Ve a nodejs.org y descarga el instalador .pkg
```

#### Linux (Ubuntu/Debian)
```bash
# Actualizar repositorios
sudo apt update

# Instalar Node.js y NPM
sudo apt install nodejs npm

# Verificar instalación
node --version
npm --version
```

### Paso 2: Clonar el Repositorio

```bash
# Clonar el repositorio
https://github.com/Wisofer/PRUEBA-TECNICA
# O descargar como ZIP y extraer
# Luego navegar al directorio
cd prueba-tecnica/frontend/prueba-tecnica
```

### Paso 3: Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# Esto instalará:
# - React 19.1.1
# - Vite 6.0.1
# - Tailwind CSS
# - Framer Motion
# - React Router DOM
# - Y muchas más...
```

## ⚙️ Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_APP_TITLE="Prueba Técnica"
VITE_APP_VERSION="1.0.0"
VITE_API_URL="http://localhost:3000"
```

### Configuración de Vercel (Para Despliegue)

El archivo `vercel.json` ya está configurado para React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🚀 Ejecución

### Modo Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor se ejecutará en:
# http://localhost:5173
```

### Modo Producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Otros Comandos

```bash
# Linting (verificar código)
npm run lint

# Linting con corrección automática
npm run lint:fix
```

## 📁 Estructura del Proyecto

```
prueba-tecnica/
├── public/                 # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── assets/            # Recursos multimedia
│   │   ├── images/        # Imágenes
│   │   ├── sounds/        # Sonidos
│   │   ├── models/        # Modelos 3D
│   │   └── docs/          # Documentación
│   ├── components/        # Componentes React
│   │   ├── layout/        # Layout y navegación
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── ui/            # Componentes de UI
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── VisualCalculator.jsx
│   │       ├── VasijaVisualizer.jsx
│   │       ├── DiagramaERFlow.jsx
│   │       ├── DiagramaERCRM.jsx
│   │       ├── SimuladorIntuitivo.jsx
│   │       ├── EstructuraComunicacion.jsx
│   │       ├── AnalisisRiesgos.jsx
│   │       ├── AttackSimulator.jsx
│   │       ├── AttackEffects.jsx
│   │       ├── NetworkVisualization.jsx
│   │       ├── Attack3DEffects.jsx
│   │       ├── AudioEffects.jsx
│   │       ├── OWASPAttacks.jsx
│   │       ├── SecurityCelebration.jsx
│   │       ├── AuditLog.jsx
│   │       └── Tutorial.jsx
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas principales
│   │   ├── Dashboard.jsx
│   │   ├── NotFound.jsx
│   │   └── problems/      # Páginas de problemas
│   │       ├── Problem1.jsx
│   │       ├── Problem2.jsx
│   │       ├── Problem3.jsx
│   │       ├── Problem4.jsx
│   │       └── Problem5.jsx
│   ├── styles/            # Estilos globales
│   ├── utils/             # Utilidades y lógica
│   │   ├── constants.js
│   │   ├── problem1.js
│   │   ├── problem3.js
│   │   ├── problem5.js
│   │   ├── sqlGenerator.js
│   │   └── sqlGeneratorProblem2.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── .gitignore             # Archivos ignorados por Git
├── .eslintrc.cjs          # Configuración ESLint
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts
├── package-lock.json      # Lock de dependencias
├── postcss.config.js      # Configuración PostCSS
├── tailwind.config.js     # Configuración Tailwind
├── vercel.json            # Configuración Vercel
├── vite.config.js         # Configuración Vite
├── DOCUMENTACION_PROBLEMAS.txt    # Documentación técnica
└── ANALISIS_IMPLEMENTACION_VS_EXAMEN.txt  # Análisis de cumplimiento
```

## 🎯 Problemas Implementados

### Problema 1: Divisores Primos
- **Algoritmo**: Suma de divisores propios primos
- **Características**: Calculadora visual, casos de prueba, auditoría completa
- **Tecnologías**: React, Framer Motion, algoritmos optimizados

### Problema 2: Sistema Call Center Bancario
- **Diagrama ER**: 10+ entidades con relaciones complejas
- **Análisis de Riesgos**: Simulador de ataques cibernéticos
- **Características**: OWASP Top 10, efectos 3D, sonidos realistas
- **Tecnologías**: D3.js, Three.js, Web Audio API

### Problema 3: Llenado de Vasijas
- **Algoritmo**: BFS (Breadth-First Search) optimizado
- **Simulación**: Visualizador interactivo paso a paso
- **Características**: Configuración flexible, métricas de performance
- **Tecnologías**: React Spring, animaciones fluidas

### Problema 4: Gestión de Proyectos
- **Preguntas**: 4 preguntas de gestión de proyectos
- **Interfaz**: Diseño compacto y profesional
- **Características**: Respuestas desde perspectiva de programador
- **Tecnologías**: React, Tailwind CSS

### Problema 5: Integración CRM - Sistema de Imágenes
- **Diagrama ER**: Replicación de sistema de imágenes
- **Transacciones XML**: 3 tipos de transacciones
- **Simulación**: Simulador de red realista con paquetes animados
- **Características**: Logs en tiempo real, estadísticas dinámicas
- **Tecnologías**: React, Framer Motion, simulaciones avanzadas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Framework principal
- **Vite 6.0.1** - Build tool y dev server
- **React Router DOM 6.28.0** - Enrutamiento
- **Tailwind CSS 3.4.0** - Framework CSS
- **Framer Motion 11.11.17** - Animaciones
- **React Spring 9.7.4** - Animaciones avanzadas

### Visualizaciones
- **D3.js 7.8.5** - Visualizaciones de datos
- **Three.js 0.169.0** - Gráficos 3D
- **ReactFlow 11.10.4** - Diagramas interactivos
- **Web Audio API** - Efectos de sonido

### Herramientas de Desarrollo
- **ESLint 9.15.0** - Linting de código
- **PostCSS 8.4.38** - Procesamiento CSS
- **Lucide React 0.460.0** - Iconos
- **React Confetti 2.0.0** - Efectos de celebración

## ✨ Características

### 🎨 Interfaz de Usuario
- **Diseño Responsivo** - Funciona en desktop, tablet y móvil
- **Tema Claro/Oscuro** - Toggle automático con persistencia
- **Animaciones Fluidas** - Transiciones suaves y profesionales
- **Navegación Intuitiva** - Sidebar colapsible y breadcrumbs

### 🔧 Funcionalidades Avanzadas
- **Simuladores Interactivos** - Visualizaciones en tiempo real
- **Auditoría Completa** - Logs detallados y métricas de performance
- **Generación SQL** - Scripts automáticos para diagramas ER
- **Tutorial Interactivo** - Guía paso a paso para nuevos usuarios

### 🚀 Performance
- **Carga Rápida** - Optimización con Vite
- **Lazy Loading** - Componentes cargados bajo demanda
- **Memoización** - Optimización de re-renders
- **Bundle Splitting** - Código dividido eficientemente

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar Repositorio**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Desplegar
   vercel
   ```

2. **Configuración Automática**
   - El archivo `vercel.json` ya está configurado
   - Las rutas de React Router funcionarán correctamente
   - Build automático en cada push

### Netlify

1. **Conectar Repositorio**
   - Conecta tu repositorio de GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Configurar Redirects**
   ```bash
   # Crear _redirects en public/
   /*    /index.html   200
   ```

### GitHub Pages

1. **Configurar GitHub Actions**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 🤝 Contribución

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** un Pull Request

### Estándares de Código

- **ESLint** - Sigue las reglas configuradas
- **Prettier** - Formato consistente
- **Conventional Commits** - Mensajes descriptivos
- **Testing** - Pruebas para nuevas funcionalidades

## 📚 Documentación Adicional

- **DOCUMENTACION_PROBLEMAS.txt** - Documentación técnica detallada
- **ANALISIS_IMPLEMENTACION_VS_EXAMEN.txt** - Análisis de cumplimiento
- **src/assets/README.md** - Organización de recursos

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Cambiar puerto
npm run dev -- --port 3000
```

### Error: "Build failed"
```bash
# Verificar Node.js version
node --version
# Debe ser 18.0.0 o superior

# Limpiar y reconstruir
npm run build
```

## 📞 Soporte

Si encuentras algún problema:

1. **Revisa** la documentación
2. **Busca** en los issues existentes
3. **Crea** un nuevo issue con detalles
4. **Incluye** logs de error y pasos para reproducir



**Desarrollado por william**

*Una aplicación de prueba técnica que demuestra conocimientos avanzados en React, algoritmos, visualizaciones y arquitectura de sistemas.*
