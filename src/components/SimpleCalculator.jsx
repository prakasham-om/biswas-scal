// // import React, { useState, useEffect } from 'react';
// // import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// // const SimpleCalculator = () => {
// //   const [inputA, setInputA] = useState('');
// //   const [inputB, setInputB] = useState('');
// //   const [highValue, setHighValue] = useState('');
// //   const [lowValue, setLowValue] = useState('');
// //   const [result, setResult] = useState(null);
// //   const [calculationMode, setCalculationMode] = useState('percentage'); // Default mode is percentage
// //   const [computedValues, setComputedValues] = useState([]);
// //   const [showTable, setShowTable] = useState(false);
// //   const [positiveValues, setPositiveValues] = useState([]);
// //   const [negativeValues, setNegativeValues] = useState([]);
// //   const [point, setPoint] = useState(0);

// //   const handleInputChange = (e, setInput) => {
// //     setInput(e.target.value);
// //   };

// //   const calculateResult = () => {
// //     const B = parseFloat(inputB);

// //     if (isNaN(B)) {
// //       setResult('Invalid input');
// //       return;
// //     }

// //     let calculatedResult;
// //     if (calculationMode === 'percentage') {
// //       calculatedResult = (parseFloat(inputA) * B) / 100 + B;
// //     } else {
// //       calculatedResult = ((parseFloat(inputA) - B) / B) * 100;
// //     }
// //     setResult(calculatedResult.toFixed(3));

// //     localStorage.setItem('calculatorInputB', inputB);

// //     localStorage.setItem('calculatorHigh', highValue);

// //     localStorage.setItem('calculatorlow', lowValue);
// //     localStorage.setItem('calculatorResult', calculatedResult.toFixed(3));
// //     // Calculate values by adding and subtracting 0.5, 1, 2, and 3 from the result
// //     const values = [0.5, 1, 1.5, 2, 2.5, 3,3.5,4,4.5,5].map(val => parseFloat(val.toFixed(1)));
// //     setComputedValues(values);
    
// //     // Calculate positive and negative values
// //     const positive = values.map(val => (parseFloat(inputA) + (val / 100) * parseFloat(inputA)).toFixed(2));
// //     const negative = values.map(val => (parseFloat(inputA) - (val / 100) * parseFloat(inputA)).toFixed(2));
// //     setPositiveValues(positive);
// //     setNegativeValues(negative);
// //     const diff = positive[1] - positive[0];
// //     setPoint((diff / 4).toFixed(2));
// //   };

// //   const clearStorage = () => {
// //     localStorage.removeItem('calculatorInputB');
// //     localStorage.removeItem('calculatorResult');
// //     localStorage.removeItem('calculatorHigh');
// //     localStorage.removeItem('calculatorlow');
    
// //     setInputB('');
// //     setHighValue('');
// //     setLowValue('');
// //     setResult(null);
// //     setComputedValues([]);
// //     setPositiveValues([]);
// //     setNegativeValues([]);
// //   };

// //   useEffect(() => {
// //     const storedInputB = localStorage.getItem('calculatorInputB');
// //     const storedResult = localStorage.getItem('calculatorResult');
// //     const storedHigh=localStorage.getItem('calculatorHigh');
// //     const storedlow=localStorage.getItem('calculatorlow');

// //     if (storedInputB) {
// //       setInputB(storedInputB);
// //     }

// //    if(storedHigh){
// //     setHighValue(storedHigh);

// //    }
// //    if(storedlow){
// //     setLowValue(storedlow);
// //    }

// //     if (storedResult) {
// //       setResult(storedResult);
// //     }

// //     // Calculate Input A based on high and low values
// //     if (highValue && lowValue) {
// //       const midpoint = (parseFloat(highValue) + parseFloat(lowValue)) / 2;
// //       setInputA(midpoint > parseFloat(inputB) ? highValue : lowValue);
// //     }
// //   }, [inputB, highValue, lowValue]);

// //   return (
// //     <div className='w-full'>
// //       <div className='flex flex-col items-center'>
// //         <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
// //           <div className='flex  gap-2'>

// //               <input
// //                 type='number'
// //                 value={highValue}
// //                 onChange={(e) => handleInputChange(e, setHighValue)}
// //                 className='px-1 py-2 border rounded-md text-black w-24'
// //                 placeholder='Input A'
                
// //               />

// //               <input
// //                 type='number'
// //                 value={lowValue}
// //                 onChange={(e) => handleInputChange(e, setLowValue)}
// //                 className='px-1 py-2 border rounded-md text-black w-24'
// //                 placeholder='Input B'
// //               />
          
  
// //               <input
// //                 type='number'
// //                 value={inputB}
// //                 onChange={(e) => handleInputChange(e, setInputB)}
// //                 className='px-1 py-2 border rounded-md text-black w-24'
// //                 placeholder='Input C'
// //               />
        
// //           </div>
// //           <div className='flex flex-col'>
// //             <label className='mb-2'>Dest: {calculationMode === 'percentage' ? '(%)' : ''}</label>
// //             <input
// //               type='number'
// //               value={inputA}
// //               onChange={(e)=>handleInputChange(e,setInputA)}
// //               className='px-4 py-2 border rounded-md text-black'
// //             />
// //             <p>
// //               Pivot: {(parseFloat(highValue) + parseFloat(lowValue)) / 2}
// //             </p>
// //           </div>
// //           <button onClick={calculateResult} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>
// //             =
// //           </button>
// //           <button onClick={clearStorage} className='mt-4 px-6 py-2 border rounded-md bg-red-500 text-white ml-4'>
// //             Delete
// //           </button>
// //           <button onClick={() => setCalculationMode(calculationMode === 'percentage' ? 'target' : 'percentage')} className='mt-4 px-6 py-2 border rounded-md bg-green-500 text-white ml-4'>
// //             {calculationMode === 'percentage' ? 'CP' : '%'}
// //           </button>
          
// //         </div>
// //         {result !== null && (
// //           <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
// //             <p className='mb-2'>Result: <b>({inputA})</b></p>
// //             <p className='text-xl font-bold'>{result}
// //             <button onClick={() => setShowTable(!showTable)} className=' p-1  rounded bg-gray-500 text-white ml-4'>
// //             {showTable ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
// //           </button>
// //             </p>
// //            Eq: {point}
// //             {showTable && (
// //               <div>
// //                 <div className='mt-6'>
// //                   <table className='w-full'>
// //                     <thead>
// //                       <tr>
// //                         <th className='p-1'>ID</th>
// //                         <th className='p-1 text-green-600'>Positive</th>
// //                         <th className='p-1 text-red-600'>Negative</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {computedValues.map((value, index) => (
// //                         <tr key={index}>
// //                           <td className='p-1'>{value}</td>
// //                           <td className='p-1'>{positiveValues[index]}</td>
// //                           <td className='p-1'>{negativeValues[index]}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SimpleCalculator;




// import React, { useState } from 'react';
// import classNames from 'classnames';

// const OptionPricer = () => {
//   const [S, setS] = useState(0);
//   const [X, setX] = useState(0);
//   const [r, setR] = useState(0);
//   const [t, setT] = useState(0);
//   const [sigma, setSigma] = useState(0);
//   const [callPrice, setCallPrice] = useState(0);
//   const [putPrice, setPutPrice] = useState(0);

//   const calculateOptionPrices = () => {
//     // Convert input values to numbers
//     const S_num = parseFloat(S);
//     const X_num = parseFloat(X);
//     const r_num = parseFloat(r);
//     const t_num = parseFloat(t);
//     const sigma_num = parseFloat(sigma);

//     const d1 = ((Math.log(S_num / X_num) + (r_num + Math.pow(sigma_num, 2) / 2) * t_num) / (sigma_num * Math.sqrt(t_num)));
//     const d2 = d1 - sigma_num * Math.sqrt(t_num);
//     const nD1 = normalDistribution(d1);
//     const nD2 = normalDistribution(d2);

//     const call = S_num * nD1 - X_num * Math.exp(-r_num * t_num) * nD2;
//     const put = X_num * Math.exp(-r_num * t_num) * normalDistribution(-d2) - S_num * normalDistribution(-d1);

//     setCallPrice(call);
//     setPutPrice(put);
//   };

//   const normalDistribution = (x) => {
//     const z = Math.abs(x) / Math.sqrt(2);
//     const t = 1 / (1 + 0.3275911 * z);
//     const a1 = 0.254829592;
//     const a2 = -0.284496736;
//     const a3 = 1.421413741;
//     const a4 = -1.453152027;
//     const a5 = 1.061405429;
//     const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
//     return 0.5 * (1 + (x < 0 ? -erf : erf));
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-4xl font-bold mb-4">Option Pricer</h1>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="S" className="block text-gray-700 font-bold mb-2">
//             S (Price of Underlying Asset)
//           </label>
//           <input
//             type="number"
//             id="S"
//             value={S}
//             onChange={(e) => setS(e.target.value)}
//             className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div>
//           <label htmlFor="X" className="block text-gray-700 font-bold mb-2">
//             X (Strike Price)
//           </label>
//           <input
//             type="number"
//             id="X"
//             value={X}
//             onChange={(e) => setX(e.target.value)}
//             className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div>
//           <label htmlFor="r" className="block text-gray-700 font-bold mb-2">
//             r (Interest Rate)
//           </label>
//           <input
//             type="number"
//             id="r"
//             value={r}
//             onChange={(e) => setR(e.target.value)}
//             className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div>
//           <label htmlFor="t" className="block text-gray-700 font-bold mb-2">
//             t (Time to Expiration)
//           </label>
//           <input
//             type="number"
//             id="t"
//             value={t}
//             onChange={(e) => setT(e.target.value)}
//             className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div>
//           <label htmlFor="sigma" className="block text-gray-700 font-bold mb-2">
//             σ (Volatility of Underlying Asset)
//           </label>
//           <input
//             type="number"
//             id="sigma"
//             value={sigma}
//             onChange={(e) => setSigma(e.target.value)}
//             className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//       </div>
//       <div className="flex justify-between mt-4">
//         <button
//           className={classNames(
//             'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
//             { 'opacity-50 cursor-not-allowed': !S || !X || !r || !t || !sigma },
//           )}
//           onClick={calculateOptionPrices}
//           disabled={!S || !X || !r || !t || !sigma}
//         >
//           Calculate
//         </button>
//         <div>
//           <p className="text-xl font-bold mb-2">Call Price:</p>
//           <p className="text-xl font-bold">{callPrice.toFixed(2)}</p>
//         </div>
//         <div>
//           <p className="text-xl font-bold mb-2">Put Price:</p>
//           <p className="text-xl font-bold">{putPrice.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OptionPricer;

import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedResults = localStorage.getItem('results');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  const calculate = () => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const newResults = [
        val * 0.618,
        val * 0.618 * 0.618,
        val * 0.618 * 0.618 * 0.618,
        val * 0.618 * 0.618 * 0.618 * 0.618,
        val * 0.618 * 0.618 * 0.618 * 0.618 * 0.618,
      ];
      setResults(newResults);
    }
  };

  const clearResults = () => {
    setResults([]);
    localStorage.removeItem('results');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Beautiful Calculator</h1>
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter a value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={calculate}
      >
        Calculate
      </button>
      <button
        className="w-full p-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={clearResults}
      >
        Clear
      </button>
      <div>
        {results.length > 0 && (
          <ul className="list-disc pl-5">
            {results.map((result, index) => (
              <li key={index} className="mb-2">
                Result {index + 1}: {result.toFixed(4)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Calculator;

