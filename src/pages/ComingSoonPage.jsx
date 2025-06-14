import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const ComingSoonPage = () => {
  return (
    <div className="bg-[#0a1930] text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center py-20 mt-20">
        <div className="flex items-center space-x-5 animate-fadeIn">
          {/* Bouncing Icon */}
          <FaRegClock className="text-6xl text-fuchsia-500 animate-bounce" />
          
          {/* Heading */}
          <h1 className="text-5xl font-bold text-fuchsia-400">Coming Soon</h1>
        </div>

        {/* Descriptive Text */}
        <p className="text-xl text-gray-300 mt-5">
          We're working hard to bring you this feature. Stay tuned!
        </p>
        <p className="text-md text-gray-500 mt-3">
          We appreciate your patience as we continue to improve our platform.
        </p>

        {/* Button to go back home */}
        <button
          onClick={() => window.location.href = '/'}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-semibold transition-all duration-300 shadow-md mt-5"
        >
          Back to Home
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ComingSoonPage;
