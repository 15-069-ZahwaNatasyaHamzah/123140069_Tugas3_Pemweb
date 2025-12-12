from pyramid.view import view_config
from pyramid.response import Response
import json
from services import ReviewAnalyzer
import logging

log = logging.getLogger(__name__)

# Simple in-memory storage for demo
reviews_storage = []

@view_config(route_name='analyze_review', renderer='json', request_method='POST')
def analyze_review(request):
    """API endpoint to analyze a product review"""
    try:
        data = request.json_body
        
        # Validate input
        review_text = data.get('review_text', '').strip()
        product_name = data.get('product_name', None)
        
        if not review_text:
            return {'error': 'Review text is required'}, 400
        
        if len(review_text) < 10:
            return {'error': 'Review text must be at least 10 characters'}, 400
        
        # Analyze review
        analysis = ReviewAnalyzer.analyze_review(review_text, product_name)
        
        # Add to memory storage for demo
        result = {
            'id': len(reviews_storage) + 1,
            'product_name': analysis['product_name'],
            'review_text': analysis['review_text'],
            'sentiment': analysis['sentiment'],
            'sentiment_score': analysis['sentiment_score'],
            'key_points': analysis['key_points'],
            'created_at': '2025-12-12T00:00:00',
        }
        
        reviews_storage.append(result)
        return result
            
    except json.JSONDecodeError:
        return {'error': 'Invalid JSON'}, 400
    except Exception as e:
        log.error(f"Error analyzing review: {e}")
        return {'error': str(e)}, 500

@view_config(route_name='get_reviews', renderer='json', request_method='GET')
def get_reviews(request):
    """API endpoint to get all reviews"""
    try:
        return list(reversed(reviews_storage))
    except Exception as e:
        log.error(f"Error getting reviews: {e}")
        return {'error': str(e)}, 500
