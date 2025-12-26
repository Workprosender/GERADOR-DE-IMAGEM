import React from 'react';
import { ImageFile, ImageData } from '../types';

interface ResultDisplayProps {
  originalImage: ImageFile | null;
  generatedImage: ImageData | null;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-square bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-purple-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-green-400">Conjuring pixels...</p>
      </div>
    </div>
  )
};

const ImageCard: React.FC<{ title: string; imageSrc: string; mimeType: string; isGenerated?: boolean }> = ({ title, imageSrc, mimeType, isGenerated = false }) => (
  <div className="space-y-2">
    <h3 className={`text-lg font-semibold text-center ${isGenerated ? 'text-green-400' : 'text-purple-400'}`}>{title}</h3>
    <div className="relative group">
      <img
        src={`data:${mimeType};base64,${imageSrc}`}
        alt={title}
        className="w-full aspect-square object-contain rounded-lg border-2 border-gray-700 bg-gray-900/50"
      />
      {isGenerated && (
         <a
          href={`data:${mimeType};base64,${imageSrc}`}
          download="generated-image.png"
          className="absolute bottom-4 right-4 bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 shadow-lg hover:bg-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download</span>
        </a>
      )}
    </div>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  if (isLoading) {
    return (
       <div className="w-full bg-gray-800/50 p-6 rounded-lg border border-gray-700">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {originalImage ? (
              <ImageCard title="Original" imageSrc={originalImage.base64} mimeType={originalImage.mimeType} />
            ) : <div className="hidden md:block"></div>}
            <LoadingSkeleton />
         </div>
       </div>
    );
  }

  if (!generatedImage) {
    return null;
  }
  
  return (
    <div className="w-full bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {originalImage ? (
           <ImageCard title="Original" imageSrc={originalImage.base64} mimeType={originalImage.mimeType} />
        ) : <div className="hidden md:block"></div>}
         
        {generatedImage && (
          <ImageCard title="Generated" imageSrc={generatedImage.base64} mimeType={generatedImage.mimeType} isGenerated />
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;