import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calculator, 
  Phone, 
  Beaker, 
  Users, 
  Database, 
  Menu, 
  X,
  ChevronRight,
  Star
} from 'lucide-react';
import { PROBLEMS } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { isDark } = useTheme();

  const iconMap = {
    Home,
    Calculator,
    Phone,
    Beaker,
    Users,
    Database
  };

  const menuItems = [
    {
      id: 'home',
      title: 'Dashboard',
      icon: 'Home',
      path: '/',
      color: 'text-blue-500'
    },
    ...PROBLEMS.map(problem => ({
      id: problem.id,
      title: problem.title,
      icon: problem.icon,
      path: problem.path,
      color: 'text-gray-600',
      difficulty: problem.difficulty,
      status: problem.status
    }))
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-50 h-screen bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
        lg:relative lg:translate-x-0 lg:h-auto border-r border-gray-200 dark:border-gray-700 flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-800 dark:text-gray-200">Prueba Técnica</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">William Dashboard</p>
                </div>
              </div>
              
              {/* Botón de colapsar cuando está expandido */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 group"
                title="Colapsar sidebar"
              >
                <div className="relative">
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  {/* Indicador de estado */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 transition-all duration-200"></div>
                </div>
              </button>
            </>
          ) : (
            /* Cuando está colapsado - solo el botón de menú centrado */
            <div className="flex justify-center w-full">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 group"
                title="Expandir sidebar"
              >
                <div className="relative">
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  {/* Indicador de estado */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 transition-all duration-200"></div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2" data-tour="sidebar">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  group flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100'
                  }
                  ${isCollapsed ? 'justify-center lg:justify-start' : 'justify-start'}
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-sm'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                    </div>
                    
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">William</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Desarrollador</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Sidebar;
