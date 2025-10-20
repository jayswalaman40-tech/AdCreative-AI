
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 leading-tight">
          Generate High-Converting Ad Creatives in Seconds
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Leverage the power of AI to craft compelling ad copy and stunning visuals that capture attention and drive results.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                <div className="text-4xl text-blue-600 mb-4">1</div>
                <h3 className="text-2xl font-bold mb-2">Provide Details</h3>
                <p className="text-gray-600">Enter your product information, target audience, and campaign goals into our simple form.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                <div className="text-4xl text-blue-600 mb-4">2</div>
                <h3 className="text-2xl font-bold mb-2">AI Generates</h3>
                <p className="text-gray-600">Our advanced AI gets to work, generating multiple ad copy variations and a unique image for your campaign.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                <div className="text-4xl text-blue-600 mb-4">3</div>
                <h3 className="text-2xl font-bold mb-2">Launch & Convert</h3>
                <p className="text-gray-600">Copy your new creatives, download the image, and launch your most effective ad campaign yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white py-6">
          <div className="container mx-auto text-center">
              <p>&copy; 2024 AdCreative AI. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;
