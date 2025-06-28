import React from 'react';
import Navbar from '../../components/Navbar';
import {Outlet,useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Ensure this is correctly imported
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
        />
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div>
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;
