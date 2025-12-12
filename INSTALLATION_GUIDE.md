# Product Review Analyzer - Installation & Running Guide

## Quick Start (Recommended for Windows)

### 1. Open PowerShell/Command Prompt in project directory

### 2. Run setup
```bash
setup.bat
```

This will:
- ✅ Create Python virtual environment
- ✅ Install backend dependencies
- ✅ Initialize database tables
- ✅ Install frontend dependencies
- ✅ Create startup scripts

### 3. Prepare PostgreSQL
Make sure PostgreSQL is running with credentials from `.env`:
```
Database: product_reviews
User: postgres
Password: password (or update in .env)
```

### 4. Start Backend (Terminal 1)
```bash
start_backend.bat
```
Expected output:
```
Starting Pyramid server at http://0.0.0.0:6543
API endpoints:
  POST /api/analyze-review - Analyze a product review
  GET /api/reviews - Get all reviews
```

### 5. Start Frontend (Terminal 2)
```bash
start_frontend.bat
```
Browser akan membuka otomatis ke `http://localhost:3000`

---

## Manual Setup (Jika diperlukan)

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python models.py
python run_server.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## Troubleshooting

### ERROR: Python not found
**Solution:** Install Python dari https://www.python.org/
Pastikan "Add Python to PATH" dicentang saat install

### ERROR: npm not found
**Solution:** Install Node.js dari https://nodejs.org/
Download dan install versi LTS

### ERROR: Database connection refused
**Solusi:**
1. Install PostgreSQL dari https://www.postgresql.org/
2. Jalankan PostgreSQL service
3. Update DATABASE_URL di backend/.env jika perlu

### ERROR: Port 6543/3000 already in use
**Solution:**
- Ganti port di backend/app.py atau frontend/package.json
- Atau tutup aplikasi lain yang menggunakan port tersebut

### ERROR: API returns 400 - Invalid JSON
**Solution:** Pastikan request body valid JSON format

### ERROR: Gemini/Hugging Face returns error
**Solution:** 
- Verifikasi API keys di backend/.env
- Pastikan API keys valid dan memiliki quota
- Check internet connection

---

## File Structure

```
Tugas3_Pemweb_069/
├── backend/                          # Python Pyramid backend
│   ├── app.py                        # Main application
│   ├── models.py                     # Database models
│   ├── views.py                      # API endpoints
│   ├── services.py                   # AI services
│   ├── run_server.py                 # Start server
│   ├── requirements.txt              # Dependencies
│   ├── .env                          # Configuration
│   └── development.ini               # Pyramid config
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewResult.jsx
│   │   │   └── ReviewList.jsx
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── index.js
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── README.md                         # Main documentation
├── GETTING_STARTED.md                # Setup guide
├── API_DOCUMENTATION.md              # API reference
├── project.json                      # Project metadata
├── setup.bat                         # Windows setup script
├── setup.sh                          # Linux/macOS setup script
├── start_backend.bat                 # Start backend (Windows)
└── start_frontend.bat                # Start frontend (Windows)
```

---

## API Endpoints

### POST /api/analyze-review
Analyze a product review

**Request:**
```json
{
  "review_text": "This product is amazing!",
  "product_name": "Product Name (optional)"
}
```

**Response:**
```json
{
  "id": 1,
  "product_name": "Product Name",
  "review_text": "This product is amazing!",
  "sentiment": "positive",
  "sentiment_score": 0.95,
  "key_points": "[\"amazing quality\", \"great value\"]",
  "created_at": "2025-12-12T10:30:00"
}
```

### GET /api/reviews
Get all reviews

**Response:**
```json
[
  {
    "id": 1,
    "product_name": "Product 1",
    "review_text": "...",
    "sentiment": "positive",
    "sentiment_score": 0.95,
    "key_points": "[...]",
    "created_at": "2025-12-12T10:30:00"
  }
]
```

---

## Testing the API

### Using cURL
```bash
# Test analyze endpoint
curl -X POST http://localhost:6543/api/analyze-review ^
  -H "Content-Type: application/json" ^
  -d "{\"review_text\":\"This is an amazing product!\",\"product_name\":\"Test Product\"}"

# Test get reviews
curl http://localhost:6543/api/reviews
```

### Using Postman
1. Open Postman
2. Create POST request: `http://localhost:6543/api/analyze-review`
3. Body (raw JSON):
```json
{
  "review_text": "This is an amazing product!",
  "product_name": "Test Product"
}
```
4. Send request

---

## Environment Variables

File: `backend/.env`

```
GEMINI_API_KEY=AIzaSyCC8UN28KsF1VgIlAzIJsQYfnj8SJgHdaU
HUGGINGFACE_API_KEY=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
DATABASE_URL=postgresql://postgres:password@localhost:5432/product_reviews
ENVIRONMENT=development
```

---

## Development Tips

### Frontend Development
- React hot reload enabled
- Edit files in `src/` folder
- Changes auto-refresh in browser
- Use React DevTools browser extension

### Backend Development
- Restart server after code changes
- Check terminal for errors and logs
- Use Postman/cURL to test endpoints

### Database
- Connect with: `psql -U postgres -d product_reviews`
- View tables: `\dt`
- View reviews: `SELECT * FROM reviews;`
- Clear data: `DELETE FROM reviews;`

---

## Performance & Optimization

- Frontend caching enabled
- API response compression
- Database query optimization
- Lazy loading components

---

## Security Notes

1. **API Keys** - Never commit .env file
2. **Database** - Use strong passwords in production
3. **CORS** - Currently open to all origins (change for production)
4. **Input Validation** - All inputs are validated

---

## Support & Troubleshooting

See `GETTING_STARTED.md` for detailed troubleshooting guide.

For API reference, see `API_DOCUMENTATION.md`.

---

## Submission

File format: `tugas_individu3.pdf`
Include:
- Nama
- NIM
- Link GitHub (if applicable)
- Screenshots of application running
- Brief description of features implemented

---
