import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RefreshCw } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/' | null;

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    setOperation(op);
    setFirstNumber(parseFloat(display));
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null) return;
    
    const secondNumber = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const CalcButton = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-xl transition-all duration-200 
      hover:bg-opacity-90 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-4 p-4 bg-gray-100 rounded-xl">
        <div className="text-right text-4xl font-bold text-gray-800 break-all">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <CalcButton onClick={clear} className="bg-red-500 text-white col-span-2">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw size={20} /> Clear
          </div>
        </CalcButton>
        <CalcButton onClick={() => setDisplay(display.slice(0, -1) || '0')} className="bg-orange-500 text-white col-span-2">
          <div className="flex items-center justify-center gap-2">
            <Delete size={20} /> Delete
          </div>
        </CalcButton>
        
        {['7', '8', '9'].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num)} className="bg-gray-200">
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperation('/')} className="bg-indigo-500 text-white">
          <Divide size={20} />
        </CalcButton>
        
        {['4', '5', '6'].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num)} className="bg-gray-200">
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperation('*')} className="bg-indigo-500 text-white">
          <X size={20} />
        </CalcButton>
        
        {['1', '2', '3'].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num)} className="bg-gray-200">
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperation('-')} className="bg-indigo-500 text-white">
          <Minus size={20} />
        </CalcButton>
        
        <CalcButton onClick={() => handleNumber('0')} className="bg-gray-200">
          0
        </CalcButton>
        <CalcButton onClick={() => handleNumber('.')} className="bg-gray-200">
          .
        </CalcButton>
        <CalcButton onClick={calculate} className="bg-green-500 text-white">
          <Equal size={20} />
        </CalcButton>
        <CalcButton onClick={() => handleOperation('+')} className="bg-indigo-500 text-white">
          <Plus size={20} />
        </CalcButton>
      </div>
    </div>
  );
}