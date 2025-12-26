import React, { useState, useCallback } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove the data URL prefix
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        alert("File is too large. Please upload an image smaller than 4MB.");
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        setPreview(URL.createObjectURL(file));
        onImageUpload({ base64, mimeType: file.type });
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert("Could not process the image. Please try another one.");
      }
    }
  }, [onImageUpload]);

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="w-full text-center">
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="Image preview" className="w-full h-auto max-h-64 object-contain rounded-md border-2 border-purple-500"/>
          <button 
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-500/50 rounded-lg hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-green-400">Click to upload</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 4MB)</span>
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
