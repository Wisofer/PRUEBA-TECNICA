import { useState, useEffect } from 'react';

export const useLoader = (minLoadingTime = 3000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const checkLoading = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= minLoadingTime) {
        // Asegurar que el loader se muestre por al menos el tiempo mínimo
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Pequeño delay adicional para transición suave
      } else {
        // Si aún no ha pasado el tiempo mínimo, seguir esperando
        setTimeout(checkLoading, 100);
      }
    };

    checkLoading();
  }, [startTime, minLoadingTime]);

  return isLoading;
};
