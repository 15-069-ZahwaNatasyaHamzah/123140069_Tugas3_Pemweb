import React from 'react';
import ReviewResult from './ReviewResult';
import { AlertCircle } from 'lucide-react';

export default function ReviewList({ reviews, isLoading }) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
        <AlertCircle className="mx-auto text-gray-400 mb-4" size={32} />
        <p className="text-gray-600">No reviews yet. Analyze a review to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>
      {reviews.map((review) => (
        <ReviewResult key={review.id} review={review} />
      ))}
    </div>
  );
}
