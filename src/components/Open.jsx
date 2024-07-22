// import React, { useState } from 'react';

// function App() {
//   const [o, setO] = useState('');
//   const [h, setH] = useState('');
//   const [l, setL] = useState('');
//   const [c, setC] = useState('');
//   const [finalResult, setFinalResult] = useState('N/A');
//   const [r1, setR1] = useState(null);
//   const [r2, setR2] = useState(null);
//   const [r3, setR3] = useState(null);
//   const [mode, setMode] = useState(null); // null, 'green', or 'red'

//   const calculateGreen = () => {
//     const numO = parseFloat(o) || 0;
//     const numH = parseFloat(h) || 0;
//     const numL = parseFloat(l) || 0;
//     const numC = parseFloat(c) || 0;

//     const r1 = Math.abs(numO - numL);
//     const r2 = Math.abs(numH - numL);
//     const r3 = Math.abs(numH - numC);
//     const final = r1 + r3;

//     const result = final > r2 ? final / r2 : r2 / final;
//     setFinalResult(isFinite(result) ? result.toFixed(2) : 'N/A');
//     setR1(r1);
//     setR2(r2);
//     setR3(r3);
//   };

//   const calculateRed = () => {
//     const numO = parseFloat(o) || 0;
//     const numH = parseFloat(h) || 0;
//     const numL = parseFloat(l) || 0;
//     const numC = parseFloat(c) || 0;

//     const r1 = Math.abs(numO - numH);
//     const r2 = Math.abs(numH - numL);
//     const r3 = Math.abs(numL - numC);
//     const final = r1 + r3;

//     const result = final > r2 ? final / r2 : r2 / final;
//     setFinalResult(isFinite(result) ? result.toFixed(2) : 'N/A');
//     setR1(r1);
//     setR2(r2);
//     setR3(r3);
//   };

//   const handleClear = () => {
//     setO('');
//     setH('');
//     setL('');
//     setC('');
//     setFinalResult('N/A');
//     setR1(null);
//     setR2(null);
//     setR3(null);
//     setMode(null);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex justify-center items-center mt-8">
//         <button
//           onClick={() => {
//             setMode('green');
//             calculateGreen();
//           }}
//           className={`py-2 px-6 rounded-full transition ${
//             mode === 'green' ? 'bg-green-600 text-white' : 'bg-green-300 hover:bg-green-400'
//           } mx-2`}
//         >
//           Green
//         </button>
//         <button
//           onClick={() => {
//             setMode('red');
//             calculateRed();
//           }}
//           className={`py-2 px-6 rounded-full transition ${
//             mode === 'red' ? 'bg-red-600 text-white' : 'bg-red-300 hover:bg-red-400'
//           } mx-2`}
//         >
//           Red
//         </button>
//       </div>
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <div className="w-full max-w-xs">
//           <input
//             type="number"
//             value={o}
//             onChange={(e) => setO(e.target.value)}
//             className="mb-4 p-2 border rounded w-full"
//            // placeholder="O"
//           />
//           <input
//             type="number"
//             value={h}
//             onChange={(e) => setH(e.target.value)}
//             className="mb-4 p-2 border rounded w-full"
//           //  placeholder="H"
//           />
//           <input
//             type="number"
//             value={l}
//             onChange={(e) => setL(e.target.value)}
//             className="mb-4 p-2 border rounded w-full"
//            // placeholder="L"
//           />
//           <input
//             type="number"
//             value={c}
//             onChange={(e) => setC(e.target.value)}
//             className="mb-4 p-2 border rounded w-full"
//            // placeholder="C"
//           />
//         </div>
//         <div className="mt-3 text-xl">
//           <p>Final Result: {finalResult}</p>
//           {r1 !== null && <p>R1: {r1.toFixed(2)}</p>}
//           {r2 !== null && <p>R2: {r2.toFixed(2)}</p>}
//           {r3 !== null && <p>R3: {r3.toFixed(2)}</p>}
//         </div>
//       </div>
//       <div className="flex justify-center mt-[-2rem] mb-8">
//         <button
//           onClick={handleClear}
//           className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition"
//         >
//           Clear Results
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

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
        val * 0.618 * 0.618 * 0.618 * 0.618 * 0.618 *0.618,
        val * 0.618 * 0.618 * 0.618 * 0.618 * 0.618 *0.618 *618
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
      <h1 className="text-2xl font-bold mb-4"></h1>
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

