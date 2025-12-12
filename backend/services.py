import os
import json
import google.generativeai as genai
import requests
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

class SentimentAnalyzer:
    """Analyze sentiment using Hugging Face"""
    
    @staticmethod
    def analyze(text):
        """
        Analyze sentiment of text using Hugging Face
        Returns: {sentiment: str, confidence: float}
        """
        try:
            url = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
            headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
            payload = {"inputs": text}
            
            response = requests.post(url, headers=headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                
                # Get the result (could be nested array)
                if isinstance(result, list) and len(result) > 0:
                    scores = result[0]
                    if isinstance(scores, list) and len(scores) > 0:
                        scores = scores[0] if isinstance(scores[0], dict) else scores
                    
                    if isinstance(scores, list):
                        # Multiple scores returned
                        best = max(scores, key=lambda x: x.get('score', 0))
                    else:
                        best = scores
                    
                    label = best.get('label', 'NEUTRAL').lower()
                    score = float(best.get('score', 0.5))
                    
                    # Normalize labels
                    if label == 'positive':
                        sentiment = 'positive'
                    elif label == 'negative':
                        sentiment = 'negative'
                    else:
                        sentiment = 'neutral'
                    
                    return {'sentiment': sentiment, 'confidence': score}
            
            return {'sentiment': 'neutral', 'confidence': 0.5}
            
        except Exception as e:
            print(f"Error in sentiment analysis: {e}")
            return {'sentiment': 'neutral', 'confidence': 0.5}

class KeyPointExtractor:
    """Extract key points using Gemini API"""
    
    @staticmethod
    def extract(review_text):
        """
        Extract key points from review text using Gemini
        Returns: list of key points
        """
        try:
            model = genai.GenerativeModel('gemini-pro')
            prompt = f"""Analyze the following product review and extract the main key points. 
Return only a JSON array of strings with key points (maximum 5 points).
Format: ["point 1", "point 2", ...]

Review: {review_text}"""
            
            response = model.generate_content(prompt)
            text = response.text.strip()
            
            # Try to parse JSON
            try:
                # Extract JSON from response
                start = text.find('[')
                end = text.rfind(']') + 1
                if start != -1 and end > start:
                    json_str = text[start:end]
                    key_points = json.loads(json_str)
                    return key_points if isinstance(key_points, list) else []
            except:
                pass
            
            return []
            
        except Exception as e:
            print(f"Error in key point extraction: {e}")
            return []

class ReviewAnalyzer:
    """Main service for analyzing reviews"""
    
    @staticmethod
    def analyze_review(review_text, product_name=None):
        """
        Complete review analysis
        Returns: {sentiment, confidence, key_points}
        """
        try:
            # Analyze sentiment
            sentiment_result = SentimentAnalyzer.analyze(review_text)
            
            # Extract key points
            key_points = KeyPointExtractor.extract(review_text)
            
            return {
                'product_name': product_name,
                'review_text': review_text,
                'sentiment': sentiment_result['sentiment'],
                'sentiment_score': sentiment_result['confidence'],
                'key_points': json.dumps(key_points),
            }
            
        except Exception as e:
            print(f"Error in review analysis: {e}")
            raise
