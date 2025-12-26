import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="e.g., A cat wearing sunglasses, neon style"
      className="w-full p-3 bg-gray-900 border-2 border-green-500/50 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 h-28 resize-none"
    />
  );
};

export default PromptInput;
