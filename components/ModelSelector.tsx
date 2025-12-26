import React from 'react';
import { ImageModel } from '../types';

interface ModelSelectorProps {
  selectedModel: ImageModel;
  onModelChange: (model: ImageModel) => void;
}

const models: { id: ImageModel; name: string; description: string }[] = [
  {
    id: 'gemini-2.5-flash-image',
    name: 'Nano Banana',
    description: 'Rápido e eficiente',
  },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div>
      <h3 className="text-md font-bold text-gray-300 mb-2 text-center">Selecione o modelo do gerador</h3>
      <div className="grid grid-cols-2 gap-4">
        {models.map((model) => (
          <div key={model.id}>
            <input
              type="radio"
              id={model.id}
              name="model-selector"
              value={model.id}
              checked={selectedModel === model.id}
              onChange={() => onModelChange(model.id)}
              className="hidden"
            />
            <label
              htmlFor={model.id}
              className={`block cursor-pointer p-3 rounded-lg text-center border-2 transition-all duration-200 ${
                selectedModel === model.id
                  ? 'bg-green-500/20 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.4)]'
                  : 'bg-gray-800 border-gray-600 hover:border-green-500'
              }`}
            >
              <span className="font-bold text-green-400">{model.name}</span>
              <span className="block text-xs text-gray-400">{model.description}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;