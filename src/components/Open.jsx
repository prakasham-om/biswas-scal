import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SimpleCalculator = () => {
  const [inputA, setInputA] = useState('');
  const [result, setResult] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [computedValues, setComputedValues] = useState([]);
  const [positiveValues, setPositiveValues] = useState([]);
  const [negativeValues, setNegativeValues] = useState([]);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    // Load inputA and result from local storage if available
    const storedInputA = localStorage.getItem('calculatorInputA');
    const storedResult = localStorage.getItem('calculatorResult');
    if (storedInputA) setInputA(storedInputA);
    if (storedResult) setResult(storedResult);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputA(value);
    // Store inputA in local storage
    localStorage.setItem('calculatorInputA', value);
  };

  const calculateResult = () => {
    if (isNaN(inputA)) {
      setResult('Invalid input');
      return;
    }

    const values = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(val => parseFloat(val.toFixed(1)));
    setComputedValues(values);

    const positive = values.map(val => (parseFloat(inputA) + (val / 100) * parseFloat(inputA)).toFixed(2));
    const negative = values.map(val => (parseFloat(inputA) - (val / 100) * parseFloat(inputA)).toFixed(2));
    setPositiveValues(positive);
    setNegativeValues(negative);
    const diff = positive[1] - positive[0];
    setPoint((diff / 4).toFixed(2));

    const calculatedResult = parseFloat(inputA).toFixed(3);
    setResult(calculatedResult);

    // Store result in local storage
    localStorage.setItem('calculatorResult', calculatedResult);
  };

  const clearInput = () => {
    setInputA('');
    setResult(null);
    setComputedValues([]);
    setPositiveValues([]);
    setNegativeValues([]);
    // Clear data from local storage
    localStorage.removeItem('calculatorInputA');
    localStorage.removeItem('calculatorResult');
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
          <div className='flex gap-2'>
            <input
              type='number'
              value={inputA}
              onChange={handleInputChange}
              className='px-1 py-2 border rounded-md text-black w-24'
              placeholder='Input A'
            />
          </div>
          <button onClick={calculateResult} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>
            =
          </button>
          <button onClick={clearInput} className='mt-4 px-6 py-2 border rounded-md bg-red-500 text-white ml-4'>
            Clear
          </button>
        </div>
        {result !== null && (
          <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
            <p className='mb-2'>Result: <b>({inputA})</b></p>
            <p className='text-xl font-bold'>{result}
              <button onClick={() => setShowTable(!showTable)} className='p-1 rounded bg-gray-500 text-white ml-4'>
                {showTable ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </p>
            Eq: {point}
            {showTable && (
              <div>
                <div className='mt-6'>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='p-1'>ID</th>
                        <th className='p-1 text-green-600'>Positive</th>
                        <th className='p-1 text-red-600'>Negative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedValues.map((value, index) => (
                        <tr key={index}>
                          <td className='p-1'>{value}</td>
                          <td className='p-1'>{positiveValues[index]}</td>
                          <td className='p-1'>{negativeValues[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCalculator;
