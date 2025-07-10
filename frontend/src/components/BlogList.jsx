import React, { useState } from 'react';
import { blogCategories } from '../assets/assets.js';
import BlogCard from './BlogCard.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const BlogList = () => {
  const [menu, setMenu] = useState('All'); 
  const { input, blogs } = useAppContext(); 

  const filteredBlogs = () => {
    if (input === '') {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10">
      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 mb-10">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${
                menu === item
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item}
              {menu === item && (
                <span className="absolute inset-0 rounded-full ring-2 ring-blue-600 animate-pulse"></span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs()
          .filter((blog) => (menu === 'All' ? true : menu === blog.category))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
