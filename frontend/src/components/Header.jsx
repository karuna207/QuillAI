import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const handleClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-100">
      {/* Background Image */}
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20"
      />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col gap-6 text-center items-center">
        {/* Announcement */}
        <div className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-1 rounded-full text-sm shadow-md">
          <img src={assets.star_icon} alt="star" className="w-4 h-4" />
          <p>New: AI feature integrated</p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
          Your Own <span className="text-blue-600">blogging</span> <br /> platform
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-700 max-w-xl">
          This is your space to think out loud and share what matters
        </p>

        {/* Search Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex w-full max-w-md mt-6 shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts..."
            className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition duration-200 font-medium"
          >
            Search
          </button>
        </form>

        {/* Clear Search Button */}
        {input && (
          <button
            onClick={handleClear}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition duration-300"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
