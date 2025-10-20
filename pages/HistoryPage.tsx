
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const viewCreative = (creativeId: string) => {
    const creative = user?.history.find(c => c.id === creativeId);
    if (creative) {
      navigate('/results', { state: { creative } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ad Creative History</h1>
      {user && user.history.length > 0 ? (
        <div className="space-y-6">
          {user.history.map((creative) => (
            <div key={creative.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <img
                src={`data:image/jpeg;base64,${creative.image}`}
                alt="Ad creative thumbnail"
                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-grow text-center md:text-left">
                <p className="text-lg font-semibold text-gray-800">
                  Product: {creative.inputs.productName}
                </p>
                <p className="text-sm text-gray-500">
                  Platform: {creative.inputs.platform}
                </p>
                <p className="text-sm text-gray-500">
                  Generated on: {new Date(creative.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => viewCreative(creative.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">No history found.</h2>
          <p className="text-gray-500 mt-2">Start by creating your first ad creative!</p>
          <button onClick={() => navigate('/dashboard')} className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Create New Ad
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
