import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SimpleCalculator = () => {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [highValue, setHighValue] = useState('');
  const [lowValue, setLowValue] = useState('');
  const [result, setResult] = useState(null);
  const [calculationMode, setCalculationMode] = useState('target'); // Default mode is percentage
  const [computedValues, setComputedValues] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [positiveValues, setPositiveValues] = useState([]);
  const [negativeValues, setNegativeValues] = useState([]);
  const [point, setPoint] = useState(0);

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const calculateResult = () => {
    const B = parseFloat(inputB);

    if (isNaN(B)) {
      setResult('Invalid input');
      return;
    }

    let calculatedResult;
    if (calculationMode === 'percentage') {
      calculatedResult = (parseFloat(inputA) * B) / 100 + B;
    } else {
      calculatedResult = ((parseFloat(inputA) - B) / B) * 100;
    }
    setResult(calculatedResult.toFixed(3));

    localStorage.setItem('calculatorInputB', inputB);
    localStorage.setItem('calculatorResult', calculatedResult.toFixed(3));

    // Calculate values by adding and subtracting 0.5, 1, 2, and 3 from the result
    const values = [0.5, 1, 1.5, 2, 2.5, 3,3.5,4,4.5,5].map(val => parseFloat(val.toFixed(1)));
    setComputedValues(values);
    
    // Calculate positive and negative values
    const positive = values.map(val => (parseFloat(inputA) + (val / 100) * parseFloat(inputA)).toFixed(2));
    const negative = values.map(val => (parseFloat(inputA) - (val / 100) * parseFloat(inputA)).toFixed(2));
    setPositiveValues(positive);
    setNegativeValues(negative);
    const diff = positive[1] - positive[0];
    setPoint((diff / 4).toFixed(2));
  };

  const clearStorage = () => {
    localStorage.removeItem('calculatorInputB');
    localStorage.removeItem('calculatorResult');
    setInputB('');
    setResult(null);
    setComputedValues([]);
    setPositiveValues([]);
    setNegativeValues([]);
  };

  useEffect(() => {
    const storedInputB = localStorage.getItem('calculatorInputB');
    const storedResult = localStorage.getItem('calculatorResult');

    if (storedInputB) {
      setInputB(storedInputB);
    }

    if (storedResult) {
      setResult(storedResult);
    }

    // Calculate Input A based on high and low values
    if (highValue && lowValue) {
      const midpoint = (parseFloat(highValue) + parseFloat(lowValue)) / 2;
      setInputA(midpoint > parseFloat(inputB) ? highValue : lowValue);
    }
  }, [inputB, highValue, lowValue]);

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
          <div className='flex  gap-2'>

              <input
                type='number'
                value={highValue}
                onChange={(e) => handleInputChange(e, setHighValue)}
                className='px-1 py-2 border rounded-md text-black w-24'
                placeholder='Input A'
                
              />

              <input
                type='number'
                value={lowValue}
                onChange={(e) => handleInputChange(e, setLowValue)}
                className='px-1 py-2 border rounded-md text-black w-24'
                placeholder='Input B'
              />
          
  
              <input
                type='number'
                value={inputB}
                onChange={(e) => handleInputChange(e, setInputB)}
                className='px-1 py-2 border rounded-md text-black w-24'
                placeholder='Input C'
              />
        
          </div>
          <div className='flex flex-col'>
            <label className='mb-2'>Dest: {calculationMode === 'percentage' ? '(%)' : ''}</label>
            <input
              type='number'
              value={inputA}
              onChange={(e)=>handleInputChange(e,setInputA)}
              className='px-4 py-2 border rounded-md text-black'
            />
            <p>
              Pivot: {(parseFloat(highValue) + parseFloat(lowValue)) / 2}
            </p>
          </div>
          <button onClick={calculateResult} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>
            =
          </button>
          <button onClick={clearStorage} className='mt-4 px-6 py-2 border rounded-md bg-red-500 text-white ml-4'>
            Delete
          </button>
          <button onClick={() => setCalculationMode(calculationMode === 'percentage' ? 'target' : 'percentage')} className='mt-4 px-6 py-2 border rounded-md bg-green-500 text-white ml-4'>
            {calculationMode === 'percentage' ? 'CP' : '%'}
          </button>
          
        </div>
        {result !== null && (
          <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
            <p className='mb-2'>Result: <b>({inputA})</b></p>
            <p className='text-xl font-bold'>{result}
            <button onClick={() => setShowTable(!showTable)} className=' p-1  rounded bg-gray-500 text-white ml-4'>
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
