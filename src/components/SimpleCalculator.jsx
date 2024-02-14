import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SimpleCalculator = () => {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState(null);
  const [calculationMode, setCalculationMode] = useState('percentage'); // Default mode is percentage
  const [computedValues, setComputedValues] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [positiveValues, setPositiveValues] = useState([]);
  const [negativeValues, setNegativeValues] = useState([]);
  const [midpointValues, setMidpointValues] = useState([]);
  const [point,setPoint]=useState(0);

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const calculateResult = () => {
    const A = parseFloat(inputA);
    const B = parseFloat(inputB);

    if (isNaN(A) || isNaN(B)) {
      setResult('Invalid input');
      return;
    }

    let calculatedResult;
    if (calculationMode === 'percentage') {
      calculatedResult = (A * B) / 100 + B;
    } else {
      calculatedResult = ((A - B) / B) * 100;
    }
    setResult(calculatedResult.toFixed(3));

    localStorage.setItem('calculatorInputA', inputA);
    localStorage.setItem('calculatorInputB', inputB);
    localStorage.setItem('calculatorResult', calculatedResult.toFixed(3));

    // Calculate values by adding and subtracting 0.5, 1, 2, and 3 from the result
    const values = [0.5, 1,1.5,2,2.5, 3].map(val => parseFloat(val.toFixed(1)));
    setComputedValues(values);
    
    // Calculate positive and negative values
    const positive = values.map(val => (A + (val / 100) * A).toFixed(2));
    const negative = values.map(val => (A - (val / 100) * A).toFixed(2));
    setPositiveValues(positive);
    setNegativeValues(negative);
    const diff=positive[1]-positive[0];
    setPoint((diff/2).toFixed(2));

    // Calculate midpoint values
    const midpoints = [];
    for (let i = 0; i < positive.length - 1; i++) {
      const positiveMidpoint = (parseFloat(positive[i]) + parseFloat(positive[i + 1])) / 2;
      const negativeMidpoint = (parseFloat(negative[i]) + parseFloat(negative[i + 1])) / 2;
      midpoints.push({ positive: positiveMidpoint.toFixed(2), negative: negativeMidpoint.toFixed(2) });
    }
    setMidpointValues(midpoints);
  };

  const clearStorage = () => {
    localStorage.removeItem('calculatorInputA');
    localStorage.removeItem('calculatorInputB');
    localStorage.removeItem('calculatorResult');
    setInputA('');
    setInputB('');
    setResult(null);
    setComputedValues([]);
    setPositiveValues([]);
    setNegativeValues([]);
    setMidpointValues([]);
  };

  useEffect(() => {
    const storedInputA = localStorage.getItem('calculatorInputA');
    const storedInputB = localStorage.getItem('calculatorInputB');
    const storedResult = localStorage.getItem('calculatorResult');

    if (storedInputA) {
      setInputA(storedInputA);
    }

    if (storedInputB) {
      setInputB(storedInputB);
    }

    if (storedResult) {
      setResult(storedResult);
    }
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='mb-2'>Input A: {calculationMode === 'percentage' ? '(%)' : ''}</label>
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
                {/**<div className='mt-6'>
                  equator
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='p-1'>ID</th>
                        <th className='p-1 text-green-600'>Positive</th>
                        <th className='p-1 text-red-600'>Negative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {midpointValues.map((value, index) => (
                        <tr key={index}>
                          <td className='p-1'>{index}</td>
                          <td className='p-1'>{value.positive}</td>
                          <td className='p-1'>{value.negative}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                      </div>**/}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCalculator;
