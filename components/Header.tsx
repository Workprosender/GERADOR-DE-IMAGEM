import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/30 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-3xl font-bold text-green-400 animate-pulse flex items-center" style={{ textShadow: '0 0 8px #34d399, 0 0 12px #34d399' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3 text-purple-400 transform -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          DARKTUBE GENERATOR
        </h1>
      </div>
    </header>
  );
};

export default Header;