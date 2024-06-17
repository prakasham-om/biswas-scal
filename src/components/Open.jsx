import React, { useState } from 'react';

function App() {
  const [o, setO] = useState('');
  const [h, setH] = useState('');
  const [l, setL] = useState('');
  const [c, setC] = useState('');
  const [finalResult, setFinalResult] = useState('N/A');
  const [mode, setMode] = useState(null); // null, 'green', or 'red'

  const calculateGreen = () => {
    const numO = parseFloat(o) || 0;
    const numH = parseFloat(h) || 0;
    const numL = parseFloat(l) || 0;
    const numC = parseFloat(c) || 0;

    const r1 = numO - numL;
    const r2 = numH - numL;
    const r3 = numL - numC;
    const final = r1 + r3;

    const result = final > r2 ? final / r2 : r2 / final;
    setFinalResult(isFinite(result) ? result.toFixed(2) : 'N/A');
  };

  const calculateRed = () => {
    const numO = parseFloat(o) || 0;
    const numH = parseFloat(h) || 0;
    const numL = parseFloat(l) || 0;
    const numC = parseFloat(c) || 0;

    const r1 = numO - numH;
    const r2 = numH - numL;
    const r3 = numL - numC;
    const final = r1 + r3;

    const result = final > r2 ? final / r2 : r2 / final;
    setFinalResult(isFinite(result) ? result.toFixed(2) : 'N/A');
  };

  const handleClear = () => {
    setO('');
    setH('');
    setL('');
    setC('');
    setFinalResult('N/A');
    setMode(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => {
            setMode('green');
            calculateGreen();
          }}
          className={`py-2 px-6 rounded-full transition ${
            mode === 'green' ? 'bg-green-600 text-white' : 'bg-green-300 hover:bg-green-400'
          } mx-2`}
        >
          Green
        </button>
        <button
          onClick={() => {
            setMode('red');
            calculateRed();
          }}
          className={`py-2 px-6 rounded-full transition ${
            mode === 'red' ? 'bg-red-600 text-white' : 'bg-red-300 hover:bg-red-400'
          } mx-2`}
        >
          Red
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-xs">
          <input
            type="number"
            value={o}
            onChange={(e) => setO(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            placeholder="O"
          />
          <input
            type="number"
            value={h}
            onChange={(e) => setH(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            placeholder="H"
          />
          <input
            type="number"
            value={l}
            onChange={(e) => setL(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            placeholder="L"
          />
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            placeholder="C"
          />
        </div>
        <p className="mt-6 text-xl">Final Result: {finalResult}</p>
      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={handleClear}
          className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition"
        >
          Clear Results
        </button>
      </div>
    </div>
  );
}

export default App;
