import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { analyzeReview } from '../api';

export default function ReviewForm({ onReviewAnalyzed, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    productName: '',
    reviewText: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.reviewText.trim()) {
      setError('Please enter a review');
      return;
    }

    if (formData.reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzeReview(
        formData.reviewText,
        formData.productName || null
      );

      onReviewAnalyzed(result);
      setFormData({ productName: '', reviewText: '' });
    } catch (err) {
      setError(err.error || 'Failed to analyze review');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyze Product Review</h2>
      
      <div className="mb-6">
        <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">
          Product Name (Optional)
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="reviewText" className="block text-gray-700 font-semibold mb-2">
          Review Text *
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Enter your product review here..."
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader size={20} className="animate-spin" />}
        {isLoading ? 'Analyzing...' : 'Analyze Review'}
      </button>
    </form>
  );
}
