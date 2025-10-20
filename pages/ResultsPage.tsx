
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdCard from '../components/AdCard';
import { AdCreative } from '../types';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const creative: AdCreative | undefined = location.state?.creative;

  if (!creative) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">No creative generated.</h2>
        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go back to Dashboard
        </button>
      </div>
    );
  }

  const imageUrl = `data:image/jpeg;base64,${creative.image}`;

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `adcreative-${Date.now()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your AI-Generated Ad Creative</h1>
      <p className="text-gray-600 mb-8">Here are the results. You can copy the text and download the image.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 self-start">Generated Image</h2>
          <img src={imageUrl} alt="Generated ad creative" className="w-full h-auto object-cover rounded-lg mb-4 shadow-md max-w-lg"/>
          <button
            onClick={downloadImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Download Image
          </button>
        </div>
        
        {/* Text Variations Section */}
        <div className="flex flex-col gap-6">
           <h2 className="text-2xl font-bold text-gray-800">Generated Ad Copy</h2>
          {creative.textVariations.map((variation, index) => (
            <AdCard key={index} variation={variation} index={index} />
          ))}
        </div>
      </div>

       <div className="mt-12 text-center">
            <button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
                Create Another Ad
            </button>
        </div>
    </div>
  );
};

export default ResultsPage;
