import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const {navigate,token,settoken,axios} = useAppContext();
  
  const logout = () => { 
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization']=null;
    settoken(null);
    navigate('/');
  };

  return (
    <>
      {/* Header/Navbar */}
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

      {/* Sidebar + Content Layout */}
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-100 min-h-screen shadow-md">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
