import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  gradient = false,
  onClick = null 
}) => {
  const baseClasses = `
    bg-white rounded-xl shadow-lg border border-gray-100 
    transition-all duration-300 ease-in-out
    ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
