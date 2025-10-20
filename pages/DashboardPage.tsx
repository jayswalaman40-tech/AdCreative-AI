
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdCreationFormState, AdTextVariation, platforms, tones, ctas } from '../types';
import { generateAdImage, generateAdText } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const initialFormState: AdCreationFormState = {
  productName: '',
  targetAudience: '',
  platform: 'Facebook',
  promotion: '',
  sellingPoints: '',
  tone: 'Friendly',
  cta: 'Shop Now',
};

const DashboardPage: React.FC = () => {
  const [formData, setFormData] = useState<AdCreationFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, updateUser, addCreativeToHistory } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.credits.remaining <= 0) {
      alert("You have no credits left. Please upgrade to the Pro plan.");
      navigate('/pricing');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [textVariations, image] = await Promise.all([
        generateAdText(formData),
        generateAdImage(formData),
      ]);

      const newCreative = {
        id: `creative_${Date.now()}`,
        timestamp: new Date().toISOString(),
        image,
        textVariations: textVariations as AdTextVariation[],
        inputs: formData,
      };

      if (user) {
        updateUser({
          ...user,
          credits: { ...user.credits, remaining: user.credits.remaining - 1 },
        });
        addCreativeToHistory(newCreative);
      }
      
      navigate('/results', { state: { creative: newCreative } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner message="Generating your amazing ad creative..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Ad Creative</h1>
      <p className="text-gray-600 mb-8">Fill in the details below and let our AI do the magic!</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
        {/* Step 1: Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product/Service Name</label>
              <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Luxe Leather Shoes" />
            </div>
             <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Men aged 25-40, fashion lovers" />
            </div>
        </div>

        {/* Step 2: Offer Details */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="promotion" className="block text-sm font-medium text-gray-700 mb-1">Offer/Promotion</label>
                <input type="text" name="promotion" id="promotion" value={formData.promotion} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Flat 20% Off + Free Shipping" />
            </div>
            <div>
                <label htmlFor="sellingPoints" className="block text-sm font-medium text-gray-700 mb-1">Key Selling Points (comma separated)</label>
                <input type="text" name="sellingPoints" id="sellingPoints" value={formData.sellingPoints} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Handcrafted, Genuine Italian Leather" />
            </div>
        </div>

        {/* Step 3: Style & Platform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">Ad Platform</label>
                <select name="platform" id="platform" value={formData.platform} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone of Voice</label>
                <select name="tone" id="tone" value={formData.tone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    {tones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="cta" className="block text-sm font-medium text-gray-700 mb-1">Call to Action (CTA)</label>
                <select name="cta" id="cta" value={formData.cta} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    {ctas.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>
        
        <div className="pt-5">
            <div className="flex justify-end">
                <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={user?.credits.remaining === 0}>
                    Generate Creative
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardPage;
