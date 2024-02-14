import React, { useState, useEffect } from 'react';
import SimpleCalculator from '../src/components/SimpleCalculator';
import UserAuthentication from '../src/components/UserAuthentication';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in from local storage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  const handleLogout = () => {
    // Remove the local storage item and set isLoggedIn to false
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className='w-full'>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout} className='border rounded m-2 p-2'>Logout</button>
          <SimpleCalculator />
        </div>
      ) : (
        <UserAuthentication onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
