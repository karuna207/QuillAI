import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className="flex flex-col border-x border-blue-200 min-h-screen pt-6 bg-white shadow-md">
      {[
        { to: '/admin', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/admin/addBlog', icon: assets.add_icon, label: 'Add Blogs' },
        { to: '/admin/listBlog', icon: assets.list_icon, label: 'List Blogs' },
        { to: '/admin/Comments', icon: assets.comment_icon, label: 'Comments' },
      ].map(({ to, icon, label }) => (
        <NavLink
          key={to}
          end={to === '/admin'}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-4 md:px-9 min-w-full md:min-w-64 cursor-pointer transition-all duration-200 
            ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary font-semibold' : 'hover:bg-gray-100'}`
          }
        >
          <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
          <p className="text-sm md:text-base">{label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
