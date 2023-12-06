import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { random } from 'lodash';

const CalculationSheet = () => {
  const [val, setValue] = useState({ high: '', low: '', close: '' });
  const [totalBuyer, setBull] = useState(0);
  const [totalSeller, setBear] = useState(0);
  const [differnce,setDiffernce]=useState(0);
  const [avg,setAvg]=useState(0);
  const [baseAvg,setBaseAvg]=useState(0);
  const [responseData, setResponseData] = useState([]);

  const calculateBearBull = () => {
    const high = parseFloat(val.high.trim());
    const low = parseFloat(val.low.trim());
    const close = parseFloat(val.close.trim());
    const currentRatio = Number((high+low+close)/3).toFixed(2);
    const bearValue = Number(currentRatio - low).toFixed(2);
    const bullValue = Number(high - currentRatio).toFixed(2);
    const differnce=high-low;
    
   
   // setBaseAvg(currentRatio);
    const calculateAvgRatio =
     
         (Number(responseData.reduce((acc,val)=>acc+val.totalSeller,0) + Number(bearValue)) / Number(responseData.reduce((acc,val)=>acc+val.totalBuyer,0) + Number(bullValue)))
      
  
    //setAvg(Number(calculateAvg).toFixed(2));
    setBear(bearValue);
    setBull(bullValue);
    setDiffernce(differnce);
    setAvg(Number(currentRatio).toFixed(2));
    
    
  };

  const saveDataToLocalStorage = () => {
    const savedData = localStorage.getItem('candlestickData') || '[]';
    const parsedData = JSON.parse(savedData);
   

   
    
    const newData = {
      totalBuyer,
      totalSeller,
      differnce,
      ratio: Number(totalSeller / totalBuyer ).toFixed(2)|| 0,
      avg
    };

    const updatedData = [...parsedData, newData];
    localStorage.setItem('candlestickData', JSON.stringify(updatedData));
    setResponseData(updatedData);
  };

  const fetchDataFromLocalStorage = useCallback(() => {
    const savedData = localStorage.getItem('candlestickData') || '[]';
    setResponseData(JSON.parse(savedData));
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem('candlestickData');
    setResponseData([]);
  };

  const debouncedCalculateBearBull = useCallback(debounce(calculateBearBull, 300), [val]);

  useEffect(() => {
    debouncedCalculateBearBull();
  }, [debouncedCalculateBearBull]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const submitHandler = () => {
    calculateBearBull();
    saveDataToLocalStorage();

    // Reset input values to default
    setValue({ high: '', low: '', close: '' });
    setBull(0);
    setBear(0);
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

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
            <button type='submit' className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>Submit</button>
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
            {responseData && responseData.map((ele) => {
              return (
                <tr key={ele.ratio+Math.random()*1}>
                  <td>{ele.differnce}</td>
                  <td>{ele.totalBuyer}</td>
                  <td>{ele.totalSeller}</td>
                  <td>{ele.ratio}</td>
                  <td>{ele.avg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalculationSheet;
