import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const CalculationSheet = () => {
  const [val, setValue] = useState({ high: '', low: '', close: '' });
  const [totalBuyer, setBull] = useState(0);
  const [totalSeller, setBear] = useState(0);
  const [difference, setDifference] = useState(0);
  const [avg, setAvg] = useState(0);
  const [cAvg, setCavg] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [responseData, setResponseData] = useState([]);

  const calculateBearBull = useCallback(() => {
    const high = parseFloat(val.high.trim());
    const low = parseFloat(val.low.trim());
    const close = parseFloat(val.close.trim());

    if (isNaN(high) || isNaN(low) || isNaN(close)) {
      // Handle invalid input
      return;
    }

    const currentRatio = parseFloat((high + low + close) / 3).toFixed(2);
    const bearValue = parseFloat(high-currentRatio).toFixed(2);
    const bullValue = parseFloat( currentRatio-low).toFixed(2);
    const difference = parseFloat(high - low).toFixed(2);

    setBear(bearValue);
    setBull(bullValue);
    setDifference(difference);

    let databaseBear = responseData.reduce((acc, ele) => acc + parseFloat(ele.totalSeller), 0);
    let databaseBull = responseData.reduce((acc, ele) => acc + parseFloat(ele.totalBuyer), 0);

    // Calculate the average ratio directly from the arrays
    const calculateAvgRatio =
      responseData.length > 0
        ? parseFloat((databaseBear + parseFloat(bearValue)) / (databaseBull + parseFloat(bullValue)))
        : parseFloat(bearValue) / parseFloat(bullValue);

    // Update the ratio state with the calculated value
    setRatio(isNaN(calculateAvgRatio) ? 0 : parseFloat(calculateAvgRatio).toFixed(2));

    // Update the avg state
    if (responseData.length > 0) {
      const previousAvg = parseFloat(responseData[responseData.length - 1].avg);
      const newAvg = (previousAvg + parseFloat(currentRatio)) / 2;
      setAvg(newAvg.toFixed(2));
    } else {
      // Set the current ratio as the first avg when there is no previous data
      setAvg(parseFloat(currentRatio).toFixed(2));
    }
  }, [val, responseData]);

  const saveDataToLocalStorage = useCallback(() => {
    const savedData = localStorage.getItem('candlestickData') || '[]';
    const parsedData = JSON.parse(savedData);

    // Calculate the timestamp
    const timestamp = calculateTimestamp(parsedData.length + 1);

    const newData = {
      currentavg: cAvg,
      totalBuyer,
      totalSeller,
      difference,
      ratio,
      avg,
      timestamp,
    };

    const updatedData = [...parsedData, newData];
    localStorage.setItem('candlestickData', JSON.stringify(updatedData));
    setResponseData(updatedData);
  }, [totalBuyer, totalSeller, difference, ratio, avg, cAvg, calculateTimestamp]);

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
          <table className='w-full border-collapse border'>
    <thead>
      <tr>
        <th className='px-2 py-2 border'>Timestamp</th>
        <th className='px-2 py-2 border'>HL</th>
        <th className='px-2 py-2 border'>Bull</th>
        <th className='px-2 py-2 border'>Bear</th>
        <th className='px-2 py-2 border'>Ratio</th>
        <th className='px-2 py-2 border'>Avg</th>
      </tr>
    </thead>
    <tbody className='text-center'>
      {responseData && responseData.map((ele, i) => (
        <tr key={i} className='border'>
          <td className='border'>{ele.timestamp}</td>
          <td className='border'>{ele.difference}</td>
          <td className='border'>{ele.totalBuyer}</td>
          <td className='border'>{ele.totalSeller}</td>
          <td className='border'>{ele.ratio}</td>
          <td className='border'>{ele.avg}</td>
        </tr>
      ))}
    </tbody>
          </table>

      </div>
    </>
  );
};

export default CalculationSheet;

const calculateTimestamp = (entryNumber) => {
  const startTime = new Date('1970-01-01T09:15:00Z');
  const interval = 5; // in minutes
  const entryTime = new Date(startTime.getTime() + (entryNumber - 1) * interval * 60000);

  // Set the time zone to Indian Standard Time (IST)
  entryTime.setHours(9, 15, 0); // Set hours, minutes, and seconds to 9:15:00 IST

  // Adjust the entry time based on the interval
  const adjustedEntryTime = new Date(entryTime.getTime() + (interval * 60000 * (entryNumber - 1)));

  const options = { hour: 'numeric', minute: 'numeric' };
  return adjustedEntryTime.toLocaleTimeString('en-IN', options);
};

