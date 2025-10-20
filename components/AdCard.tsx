
import React, { useState } from 'react';
import { AdTextVariation } from '../types';

interface AdCardProps {
  variation: AdTextVariation;
  index: number;
}

const AdCard: React.FC<AdCardProps> = ({ variation, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Headline: ${variation.headline}\n\nBody: ${variation.body}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-blue-800 mb-2">Variation {index + 1}</h3>
        <p className="text-md font-semibold text-gray-800 mb-1">Headline:</p>
        <p className="text-gray-600 mb-4 bg-gray-50 p-2 rounded">{variation.headline}</p>
        <p className="text-md font-semibold text-gray-800 mb-1">Body:</p>
        <p className="text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap">{variation.body}</p>
      </div>
      <button
        onClick={handleCopy}
        className={`mt-4 w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
          copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {copied ? 'Copied!' : 'Copy Text'}
      </button>
    </div>
  );
};

export default AdCard;
