import React, { useState, useEffect } from 'react';

const UserAuthentication = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const defaultAdminUsername = 'admin';
  const defaultAdminPassword = 'Password';

  const handleLogin = () => {
    if (username === defaultAdminUsername && password === defaultAdminPassword) {
      // Login successful, set local storage item to indicate user is logged in
      localStorage.setItem('isLoggedIn', 'true');
      // Call the onLogin prop with true to indicate successful login
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <div className='bg-gray-100 p-8 rounded-lg shadow-md mb-8'>
          <div className='flex flex-col'>
            <label className='mb-2'>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='px-4 py-2 border rounded-md text-black'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label className='mb-2'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-4 py-2 border rounded-md text-black'
            />
          </div>
          <button onClick={handleLogin} className='mt-4 px-6 py-2 border rounded-md bg-blue-500 text-white'>
            Login
          </button>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
