import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TutorialProvider from '../ui/Tutorial';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TutorialProvider>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          
          {/* Page content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </TutorialProvider>
  );
};

export default Layout;
