import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Moon, 
  Sun,
  Search,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PROBLEMS } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  // Encontrar el problema actual
  const currentProblem = PROBLEMS.find(p => p.path === location.pathname);
  const isHome = location.pathname === '/';

  // Estadísticas rápidas
  const completedProblems = PROBLEMS.filter(p => p.status === 'completed').length;
  const totalProblems = PROBLEMS.length;

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {isHome ? 'Dashboard Principal' : currentProblem?.title || 'Página no encontrada'}
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Time */}
          <div className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">{currentTime}</span>
          </div>

          {/* Search (placeholder) */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden lg:block">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            data-tour="theme-toggle"
          >
            {isDark ? 
              <Sun className="w-5 h-5 text-gray-600 dark:text-yellow-500" /> : 
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            }
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">William</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Desarrollador</div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
