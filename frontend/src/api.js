import axios from 'axios';

const API_BASE_URL = 'http://localhost:6543';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeReview = async (reviewText, productName) => {
  try {
    const response = await api.post('/api/analyze-review', {
      review_text: reviewText,
      product_name: productName,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReviews = async () => {
  try {
    const response = await api.get('/api/reviews');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
