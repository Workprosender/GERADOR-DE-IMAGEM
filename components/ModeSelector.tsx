import React from 'react';

interface ModeSelectorProps {
  selectedMode: 'image' | 'video';
  onModeChange: (mode: 'image' | 'video') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  const baseClasses = "w-full py-2 px-4 text-lg font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const activeClasses = "bg-green-500 text-gray-900 shadow-[0_0_10px_rgba(74,222,128,0.5)]";
  const inactiveClasses = "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-green-400 border border-purple-500/50";

  return (
    <div className="w-full max-w-sm mx-auto p-1 bg-gray-900/80 rounded-lg border border-purple-500/30 flex space-x-2">
      <button
        onClick={() => onModeChange('image')}
        className={`${baseClasses} ${selectedMode === 'image' ? activeClasses : inactiveClasses} focus:ring-green-400`}
        aria-pressed={selectedMode === 'image'}
      >
        Image
      </button>
      <button
        onClick={() => onModeChange('video')}
        className={`${baseClasses} ${selectedMode === 'video' ? activeClasses : inactiveClasses} focus:ring-green-400`}
        aria-pressed={selectedMode === 'video'}
      >
        Video
      </button>
    </div>
  );
};

export default ModeSelector;