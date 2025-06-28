import React from 'react';

const NewsLetter = () => {
  return (
    <div className="bg-blue-50 py-10 px-4 sm:px-8 md:px-16 lg:px-24 text-center rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Never miss a blog</h1>
      <p className="text-gray-600 mb-6">Subscribe to get the latest blogs and technological updates</p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Enter your Email ID"
          required
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
