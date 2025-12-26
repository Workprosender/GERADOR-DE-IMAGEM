import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/80 border-t border-green-500/30 p-4 mt-8">
      <div className="container mx-auto text-center text-sm text-gray-500">
        <p>Image generation by Gemini 2.5 Flash. Created with a touch of neon.</p>
      </div>
    </footer>
  );
};

export default Footer;