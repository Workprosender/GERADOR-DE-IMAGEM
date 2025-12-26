import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center py-3 px-6 bg-green-500 text-gray-900 font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-[0_0_10px_rgba(74,222,128,0.4),0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_15px_rgba(74,222,128,0.6),0_0_30px_rgba(74,222,128,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-400"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ActionButton;