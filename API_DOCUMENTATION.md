# API Documentation

## Base URL
```
http://localhost:6543
```

## Endpoints

### 1. Analyze Review
Menganalisis review produk dan mengembalikan hasil sentiment analysis + key points.

**Endpoint:** `POST /api/analyze-review`

**Headers:**
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

**Request Body:**
```json
{
  "review_text": "This product is absolutely amazing! The quality is excellent and it arrived faster than expected. Highly recommend!",
  "product_name": "Wireless Headphones Pro" // optional
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "product_name": "Wireless Headphones Pro",
  "review_text": "This product is absolutely amazing! The quality is excellent and it arrived faster than expected. Highly recommend!",
  "sentiment": "positive",
  "sentiment_score": 0.98,
  "key_points": "[\"Amazing quality\", \"Fast delivery\", \"Highly recommended\"]",
  "created_at": "2025-12-12T15:30:45.123456"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Review text must be at least 10 characters"
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Failed to save review to database"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (validation error)
- `500` - Server error

**Example cURL:**
```bash
curl -X POST http://localhost:6543/api/analyze-review \
  -H "Content-Type: application/json" \
  -d '{
    "review_text": "This product is absolutely amazing!",
    "product_name": "Wireless Headphones"
  }'
```

**Example Python:**
```python
import requests

response = requests.post(
    'http://localhost:6543/api/analyze-review',
    json={
        'review_text': 'This product is absolutely amazing!',
        'product_name': 'Wireless Headphones'
    }
)
print(response.json())
```

**Example JavaScript/Fetch:**
```javascript
fetch('http://localhost:6543/api/analyze-review', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    review_text: 'This product is absolutely amazing!',
    product_name: 'Wireless Headphones'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### 2. Get All Reviews
Mengambil semua review yang telah dianalisis dari database.

**Endpoint:** `GET /api/reviews`

**Headers:**
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

**Query Parameters:** (None)

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "product_name": "Wireless Headphones Pro",
    "review_text": "This product is absolutely amazing!",
    "sentiment": "positive",
    "sentiment_score": 0.98,
    "key_points": "[\"Amazing quality\", \"Fast delivery\"]",
    "created_at": "2025-12-12T15:30:45.123456"
  },
  {
    "id": 2,
    "product_name": "Laptop Stand",
    "review_text": "Not satisfied with this product. It broke after a week.",
    "sentiment": "negative",
    "sentiment_score": 0.92,
    "key_points": "[\"Broke quickly\", \"Poor durability\"]",
    "created_at": "2025-12-12T15:25:30.654321"
  }
]
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Failed to retrieve reviews"
}
```

**Status Codes:**
- `200` - Success (returns array, could be empty)
- `500` - Server error

**Example cURL:**
```bash
curl http://localhost:6543/api/reviews
```

**Example Python:**
```python
import requests

response = requests.get('http://localhost:6543/api/reviews')
reviews = response.json()
for review in reviews:
    print(f"Product: {review['product_name']}")
    print(f"Sentiment: {review['sentiment']}")
    print(f"Score: {review['sentiment_score']}")
    print(f"Key Points: {review['key_points']}")
    print("---")
```

**Example JavaScript/Fetch:**
```javascript
fetch('http://localhost:6543/api/reviews')
  .then(response => response.json())
  .then(reviews => {
    reviews.forEach(review => {
      console.log(`Product: ${review.product_name}`);
      console.log(`Sentiment: ${review.sentiment}`);
      console.log(`Score: ${review.sentiment_score}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

## Response Format

### Review Object
```json
{
  "id": number,              // Unique identifier
  "product_name": string,    // Product name (nullable)
  "review_text": string,     // The review text
  "sentiment": string,       // "positive" | "negative" | "neutral"
  "sentiment_score": number, // 0.0 - 1.0 (confidence)
  "key_points": string,      // JSON array as string
  "created_at": string       // ISO 8601 datetime
}
```

### Sentiment Values
- `positive` - Positive sentiment (score typically 0.7-1.0)
- `negative` - Negative sentiment (score typically 0.7-1.0)
- `neutral` - Neutral sentiment (score typically 0.5-0.7)

---

## Error Handling

### Common Errors

**Invalid JSON:**
```json
{
  "error": "Invalid JSON"
}
```

**Missing Review Text:**
```json
{
  "error": "Review text is required"
}
```

**Review Too Short:**
```json
{
  "error": "Review text must be at least 10 characters"
}
```

**Database Error:**
```json
{
  "error": "Failed to save review to database"
}
```

**API Service Error:**
```json
{
  "error": "Failed to analyze review"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. For production:
- Implement per-IP rate limiting
- Add authentication tokens
- Setup API key system

---

## CORS

CORS is enabled for all origins:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

For production, restrict to specific origins:
```python
# In app.py
ALLOWED_ORIGINS = ['https://yourdomain.com']
```

---

## Version History

- **v1.0** - Initial release
  - POST /api/analyze-review
  - GET /api/reviews

---

