import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

export default function ReviewResult({ review }) {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="text-green-600" size={24} />;
      case 'negative':
        return <ThumbsDown className="text-red-600" size={24} />;
      default:
        return <Minus className="text-yellow-600" size={24} />;
    }
  };

  const getSentimentText = (sentiment) => {
    return sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
  };

  const keyPoints = review.key_points ? JSON.parse(review.key_points) : [];

  return (
    <div className={`border-2 rounded-lg p-6 mb-4 ${getSentimentColor(review.sentiment)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {review.product_name && (
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {review.product_name}
            </h3>
          )}
          <p className="text-gray-700 mb-4 text-sm italic">{review.review_text}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {getSentimentIcon(review.sentiment)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm font-semibold">Sentiment</p>
          <p className="text-lg font-bold text-gray-800">
            {getSentimentText(review.sentiment)}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm font-semibold">Confidence</p>
          <p className="text-lg font-bold text-gray-800">
            {(review.sentiment_score * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {keyPoints.length > 0 && (
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">Key Points</p>
          <ul className="space-y-1">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="text-gray-800 text-sm flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">
        {new Date(review.created_at).toLocaleString()}
      </p>
    </div>
  );
}
