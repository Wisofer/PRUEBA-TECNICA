import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const VisualCalculator = ({ value, onChange, onCalculate, onClear }) => {
  const [display, setDisplay] = useState(value || '');

  const handleNumberClick = (num) => {
    const newValue = display + num;
    setDisplay(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setDisplay('');
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  const handleBackspace = () => {
    const newValue = display.slice(0, -1);
    setDisplay(newValue);
    onChange(newValue);
  };

  const handleCalculate = () => {
    if (display.trim()) {
      onCalculate();
    }
  };

  const handlePresetClick = (preset) => {
    setDisplay(preset.toString());
    onChange(preset.toString());
  };

  // Sincronizar con prop value cuando cambia externamente
  React.useEffect(() => {
    if (value !== display) {
      setDisplay(value || '');
    }
  }, [value]);

  const buttonClasses = "w-full h-12 rounded-lg font-semibold transition-all duration-150 active:scale-95 hover:shadow-md";
  const numberButtonClasses = `${buttonClasses} bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300`;
  const operatorButtonClasses = `${buttonClasses} bg-blue-500 hover:bg-blue-600 text-white shadow-md`;
  const specialButtonClasses = `${buttonClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200`;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner border border-gray-200">
      {/* Display */}
      <div className="bg-black rounded-lg p-4 mb-4 shadow-inner">
        <div className="text-right">
          <div className="text-green-400 font-mono text-2xl min-h-[2rem] flex items-center justify-end">
            {display || '0'}
          </div>
          <div className="text-green-300 text-xs opacity-70 mt-1">
            Divisores Primos Calculator
          </div>
        </div>
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className={`${specialButtonClasses} col-span-2 flex items-center justify-center gap-2`}
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={handleBackspace}
          className={`${specialButtonClasses} flex items-center justify-center`}
        >
          <Delete className="w-4 h-4" />
        </button>
        <button
          onClick={handleCalculate}
          className={`${operatorButtonClasses} text-sm font-bold`}
        >
          =
        </button>

        {/* Row 2 */}
        <button onClick={() => handleNumberClick('7')} className={numberButtonClasses}>7</button>
        <button onClick={() => handleNumberClick('8')} className={numberButtonClasses}>8</button>
        <button onClick={() => handleNumberClick('9')} className={numberButtonClasses}>9</button>
        <button onClick={() => handleNumberClick('00')} className={`${specialButtonClasses} text-sm`}>00</button>

        {/* Row 3 */}
        <button onClick={() => handleNumberClick('4')} className={numberButtonClasses}>4</button>
        <button onClick={() => handleNumberClick('5')} className={numberButtonClasses}>5</button>
        <button onClick={() => handleNumberClick('6')} className={numberButtonClasses}>6</button>
        <button onClick={() => handleNumberClick('000')} className={`${specialButtonClasses} text-xs`}>000</button>

        {/* Row 4 */}
        <button onClick={() => handleNumberClick('1')} className={numberButtonClasses}>1</button>
        <button onClick={() => handleNumberClick('2')} className={numberButtonClasses}>2</button>
        <button onClick={() => handleNumberClick('3')} className={numberButtonClasses}>3</button>
        <button
          onClick={handleCalculate}
          className={`${operatorButtonClasses} row-span-2 flex items-center justify-center text-lg font-bold`}
        >
          CALC
        </button>

        {/* Row 5 */}
        <button onClick={() => handleNumberClick('0')} className={`${numberButtonClasses} col-span-2`}>0</button>
        <button 
          onClick={() => handlePresetClick(Math.floor(Math.random() * 1000) + 100)} 
          className={`${specialButtonClasses} text-xs`}
        >
          🎲
        </button>
      </div>

    </div>
  );
};

export default VisualCalculator;
