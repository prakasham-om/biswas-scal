import React, { useState } from 'react';

const SimpleCalculator = () => {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const calculateResult = () => {
    const A = parseFloat(inputA);
    const B = parseFloat(inputB);

    if (isNaN(A) || isNaN(B)) {
      // Handle invalid input
      setResult('Invalid input');
      return;
    }

    const calculatedResult = (A * B) / 100 + B;
    setResult(calculatedResult.toFixed(2));
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='mb-2'>Input A:</label>
              <input
                type='number'
                value={inputA}
                onChange={(e) => handleInputChange(e, setInputA)}
                className='px-4 py-2 border rounded-md text-black'
              />
            </div>
            <div className='flex flex-col'>
              <label className='mb-2'>Input B:</label>
              <input
                type='number'
                value={inputB}
                onChange={(e) => handleInputChange(e, setInputB)}
                className='px-4 py-2 border rounded-md text-black'
              />
            </div>
          </div>
          <button onClick={calculateResult} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>
            Calculate
          </button>
        </div>
        {result !== null && (
          <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
            <p className='mb-2'>Result:</p>
            <p className='text-xl font-bold'>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCalculator;
