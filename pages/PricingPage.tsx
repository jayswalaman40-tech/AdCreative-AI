
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const { user, upgradePlan } = useAuth();
  const navigate = useNavigate();
  const [upgraded, setUpgraded] = useState(false);

  const handleUpgrade = () => {
    // This simulates a payment gateway interaction
    upgradePlan();
    setUpgraded(true);
    setTimeout(() => {
        navigate('/dashboard');
    }, 3000);
  };
  
  if (upgraded) {
      return (
          <div className="max-w-2xl mx-auto p-8 text-center">
              <h1 className="text-3xl font-bold text-green-600 mb-4">Upgrade Successful!</h1>
              <p className="text-lg text-gray-700">Welcome to the Pro Plan! You now have 1000 credits. Redirecting you to the dashboard...</p>
          </div>
      )
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Choose the plan that's right for you
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Unlock your creative potential with our powerful AI tools.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 border-2 ${user?.plan === 'free' ? 'border-blue-600' : 'border-transparent'}`}>
            <h2 className="text-3xl font-bold text-gray-900">Free</h2>
            <p className="mt-4 text-gray-600">Perfect for getting started and trying out our platform.</p>
            <div className="mt-8">
              <span className="text-5xl font-extrabold text-gray-900">$0</span>
              <span className="text-xl font-medium text-gray-600">/day</span>
            </div>
            <ul className="mt-8 space-y-4 text-left">
              <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">2 Ad Creatives per day</span>
              </li>
               <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">AI-Powered Text Generation</span>
              </li>
               <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">AI-Powered Image Generation</span>
              </li>
            </ul>
             <button disabled className="mt-10 w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 border-2 ${user?.plan === 'pro' ? 'border-blue-600' : 'border-transparent'}`}>
            <h2 className="text-3xl font-bold text-gray-900">Pro</h2>
            <p className="mt-4 text-gray-600">For professionals and agencies who need volume and power.</p>
            <div className="mt-8">
              <span className="text-5xl font-extrabold text-gray-900">$999</span>
              <span className="text-xl font-medium text-gray-600">/month</span>
            </div>
            <ul className="mt-8 space-y-4 text-left">
              <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">1000 Ad Creatives per month</span>
              </li>
               <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">All features from Free Plan</span>
              </li>
               <li className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span className="ml-3 text-gray-700">Priority Support</span>
              </li>
            </ul>
            {user?.plan === 'free' ? (
                <button onClick={handleUpgrade} className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Upgrade to Pro
                </button>
            ) : (
                <button disabled className="mt-10 w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed">
                    Current Plan
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
