import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md ">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="h-20 cursor-pointer rounded"
      />

      <button onClick={() => { navigate('/admin') }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 cursor-pointer">
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Navbar;
