import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const CalculationSheet = () => {
  const [val, setValue] = useState({ high: '', low: '', close: '' });
  const [totalBuyer, setBull] = useState(0);
  const [totalSeller, setBear] = useState(0);
  const [difference, setDifference] = useState(0);
  const [avg, setAvg] = useState(0);
  const [cAvg,setCavg]=useState(0);
  const [ratio, setRatio] = useState(0);
  const [responseData, setResponseData] = useState([]);

 // ... (previous code)

const calculateBearBull = useCallback(() => {
  const high = parseFloat(val.high.trim());
  const low = parseFloat(val.low.trim());
  const close = parseFloat(val.close.trim());

  if (isNaN(high) || isNaN(low) || isNaN(close)) {
    // Handle invalid input
    return;
  }

  const currentRatio = parseFloat((high + low + close) / 3).toFixed(2);
  const bearValue = parseFloat(currentRatio - low).toFixed(2);
  const bullValue = parseFloat(high - currentRatio).toFixed(2);
  const difference = parseFloat(high - low).toFixed(2);

  setBear(bearValue);
  setBull(bullValue);
  setDifference(difference);
  setCavg(parseFloat(currentRatio).toFixed(2));
  let databaseBear = responseData.reduce((acc, ele) => acc + parseFloat(ele.totalSeller), 0);
  let databaseBull = responseData.reduce((acc, ele) => acc + parseFloat(ele.totalBuyer), 0);

  // Calculate the average ratio directly from the arrays
  const calculateAvgRatio =
    responseData.length > 0
      ? parseFloat((databaseBear + parseFloat(bearValue)) / (databaseBull + parseFloat(bullValue)))
      : parseFloat(bearValue) / parseFloat(bullValue);

  // Update the ratio state with the calculated value
  setRatio(isNaN(calculateAvgRatio) ? 0 : parseFloat(calculateAvgRatio).toFixed(2));

  // If responseData length is greater than 0, calculate the average of averages
  if (responseData.length > 0) {
    const avgSum = responseData.reduce((acc, ele) => acc + parseFloat(ele.currentavg), 0);
    const newAvg = (avgSum + parseFloat(currentRatio)) / (responseData.length + 1); // Adding 1 for the current calculation
    setAvg(newAvg.toFixed(2));
  } else {
    setAvg(parseFloat(currentRatio).toFixed(2));
  }
}, [val, responseData]);

  

  const saveDataToLocalStorage = useCallback(() => {
    const savedData = localStorage.getItem('candlestickData') || '[]';
    const parsedData = JSON.parse(savedData);

    const newData = {
      currentavg:cAvg,
      totalBuyer,
      totalSeller,
      difference,
      ratio,
      avg,
    };

    const updatedData = [...parsedData, newData];
    localStorage.setItem('candlestickData', JSON.stringify(updatedData));
    setResponseData(updatedData);
  }, [totalBuyer, totalSeller, difference, ratio, avg]);

  const fetchDataFromLocalStorage = useCallback(() => {
    const savedData = localStorage.getItem('candlestickData') || '[]';
    setResponseData(JSON.parse(savedData));
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem('candlestickData');
    setResponseData([]);
  }, []);

  const debouncedCalculateBearBull = useCallback(debounce(calculateBearBull, 300), [calculateBearBull]);

  useEffect(() => {
    debouncedCalculateBearBull();
  }, [debouncedCalculateBearBull]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const submitHandler = useCallback(() => {
    calculateBearBull();
    saveDataToLocalStorage();

    // Reset input values to default
    setValue({ high: '', low: '', close: '' });
  }, [calculateBearBull, saveDataToLocalStorage]);

  const isSubmitDisabled = !val.high || !val.low || !val.close || val.high === '0' || val.low === '0' || val.close === '0';

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col items-center'>
          <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }} className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex flex-col'>
                <label className='mb-2'>High:</label>
                <input
                  type='number'
                  name='high'
                  value={val.high}
                  onChange={handleOnChange}
                  className='px-4 py-2 border rounded-md text-black'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2'>Low:</label>
                <input
                  type='number'
                  name='low'
                  value={val.low}
                  onChange={handleOnChange}
                  className='px-4 py-2 border rounded-md text-black'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2'>Close:</label>
                <input
                  type='number'
                  name='close'
                  value={val.close}
                  onChange={handleOnChange}
                  className='px-4 py-2 border rounded-md text-black'
                />
              </div>
            </div>
            <button type='submit' disabled={isSubmitDisabled} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>Submit</button>
          </form>
          <button onClick={clearLocalStorage} className='mt-4 px-6 py-2 border rounded-md bg-red-500 text-white'>Clear LocalStorage</button>
        </div>
        <table className='w-full '>
          <thead>
            <tr>
              <th className='px-2 py-2'>(High-low)</th>
              <th className='px-2 py-2'>Bull</th>
              <th className='px-2 py-2'>Bear</th>
              <th className='px-2 py-2'>Ratio</th>
              <th className='px-2 py-2'>Avg</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {responseData && responseData.map((ele, i) => (
              <tr key={i + 1}>
                <td>{ele.difference}</td>
                <td>{ele.totalBuyer}</td>
                <td>{ele.totalSeller}</td>
                <td>{ele.ratio}</td>
                <td>{ele.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalculationSheet;
