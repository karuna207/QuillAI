import React from 'react';
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-zinc-300 text-white px-6 py-10 mt-20">
      {/* Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        
        {/* Logo + Description */}
        <div className="col-span-1">
          <img src={assets.logo} alt="logo" className="h-10 mb-4" />
          <p className="text-sm text-gray-400">Where you can write your thoughts</p>
        </div>

        {/* Footer Sections */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © 2025 QuillAI. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
