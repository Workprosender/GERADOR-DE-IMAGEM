import React, { useState, useCallback } from 'react';
import { generateOrEditImage } from './services/geminiService';
import { ImageFile, ImageData } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ActionButton from './components/ActionButton';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: ImageFile | null) => {
    setOriginalImage(file);
    setGeneratedImage(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateOrEditImage(prompt, originalImage, 'gemini-2.5-flash-image');
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please check your prompt and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, originalImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4 w-full">
        <div className="w-full max-w-4xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 bg-gray-800/50 p-6 rounded-lg border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <h2 className="text-xl font-bold text-green-400 text-center">1. Upload Image (Optional)</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            <div className="space-y-6 bg-gray-800/50 p-6 rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <h2 className="text-xl font-bold text-green-400 text-center">2. Describe Your Vision</h2>
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              <ActionButton 
                onClick={handleGenerate} 
                isLoading={isLoading} 
                disabled={!prompt || isLoading}
              >
                Generate Image
              </ActionButton>
            </div>
          </div>
          
          {error && <ErrorDisplay message={error} />}

          <ResultDisplay 
            originalImage={originalImage}
            generatedImage={generatedImage}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;