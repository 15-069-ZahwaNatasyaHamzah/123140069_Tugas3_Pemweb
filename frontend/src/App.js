import React, { useState, useEffect } from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { getReviews } from './api';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewAnalyzed = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 Product Review Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze product reviews with AI-powered sentiment analysis & key point extraction
          </p>
        </header>

        <ReviewForm 
          onReviewAnalyzed={handleReviewAnalyzed}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <ReviewList reviews={reviews} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
