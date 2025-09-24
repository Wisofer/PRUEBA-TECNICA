import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Página no encontrada
            </h2>
            <p className="text-gray-600">
              La página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/">
              <Button 
                size="lg" 
                className="w-full"
                icon={<Home className="w-5 h-5" />}
              >
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
