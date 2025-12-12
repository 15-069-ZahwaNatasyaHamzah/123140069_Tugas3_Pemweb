# Product Review Analyzer

Aplikasi untuk menganalisis ulasan produk menggunakan AI sentiment analysis dan ekstraksi poin kunci.

## Fitur Utama

✨ **Fitur Aplikasi:**
1. **Input Review** - User dapat menginput review produk sebagai text
2. **Sentiment Analysis** - Analisis sentimen (positif/negatif/netral) menggunakan Hugging Face
3. **Key Point Extraction** - Ekstraksi poin kunci dari review menggunakan Gemini API
4. **Display Results** - Tampilkan hasil analisis di React frontend
5. **Database Integration** - Simpan hasil ke PostgreSQL database

## Tech Stack

- **Frontend:** React 18
- **Backend:** Pyramid (Python)
- **Database:** PostgreSQL
- **APIs:**
  - Gemini API (Key point extraction)
  - Hugging Face API (Sentiment analysis)

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL 12+
- pip dan npm

## Installation & Setup

### 1. Setup Backend (Pyramid)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update .env dengan kredensial Anda
# GEMINI_API_KEY=your_gemini_api_key
# HUGGINGFACE_API_KEY=your_huggingface_api_key
# DATABASE_URL=postgresql://user:password@localhost:5432/product_reviews
```

### 2. Setup Database (PostgreSQL)

```bash
# Create database
createdb product_reviews

# Initialize tables
python models.py
```

### 3. Start Backend Server

```bash
python run_server.py
```

Backend akan berjalan di `http://localhost:6543`

### 4. Setup Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend akan berjalan di `http://localhost:3000`

## API Endpoints

### POST /api/analyze-review
Analyze a product review and extract sentiment + key points.

**Request:**
```json
{
  "review_text": "This product is amazing! Works perfectly.",
  "product_name": "Product Name (optional)"
}
```

**Response:**
```json
{
  "id": 1,
  "product_name": "Product Name",
  "review_text": "This product is amazing! Works perfectly.",
  "sentiment": "positive",
  "sentiment_score": 0.95,
  "key_points": "[\"Works perfectly\", \"Amazing quality\"]",
  "created_at": "2025-12-12T10:30:00"
}
```

### GET /api/reviews
Get all reviews from database.

**Response:**
```json
[
  {
    "id": 1,
    "product_name": "Product Name",
    "review_text": "This product is amazing!",
    "sentiment": "positive",
    "sentiment_score": 0.95,
    "key_points": "[\"Amazing\", \"Great quality\"]",
    "created_at": "2025-12-12T10:30:00"
  }
]
```

## Project Structure

```
Tugas3_Pemweb_069/
├── backend/
│   ├── app.py              # Pyramid application configuration
│   ├── models.py           # SQLAlchemy models
│   ├── views.py            # API endpoints
│   ├── services.py         # AI services (Sentiment, Key Points)
│   ├── run_server.py       # Server startup script
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables
│   └── development.ini     # Pyramid configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReviewForm.jsx      # Review input form
│   │   │   ├── ReviewResult.jsx    # Single review display
│   │   │   └── ReviewList.jsx      # Reviews list
│   │   ├── api.js          # API client
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # App styles
│   │   ├── index.js        # React entry point
│   │   ├── index.css       # Global styles
│   │   └── ...
│   ├── public/
│   │   ├── index.html      # HTML template
│   │   └── ...
│   ├── package.json        # Node dependencies
│   └── .gitignore
└── README.md
```

## Workflow Aplikasi

1. **User Input** - User memasukkan review produk di React form
2. **API Request** - Frontend mengirim POST request ke `/api/analyze-review`
3. **Sentiment Analysis** - Backend menggunakan Hugging Face untuk analisis sentimen
4. **Key Point Extraction** - Backend menggunakan Gemini untuk ekstraksi poin kunci
5. **Database Save** - Hasil disimpan ke PostgreSQL
6. **Display Result** - Frontend menampilkan hasil analisis
7. **View History** - User dapat melihat semua review yang pernah dianalisis

## Error Handling

- ✅ Validasi input (minimum 10 karakter)
- ✅ Error handling untuk API calls
- ✅ Loading states
- ✅ Database error recovery
- ✅ CORS support

## Deployment Notes

- Set `ENVIRONMENT=production` di .env untuk production
- Update `DATABASE_URL` dengan production database
- Update API keys untuk production APIs
- Setup reverse proxy (Nginx/Apache) untuk frontend

## Troubleshooting

### Database connection error
- Pastikan PostgreSQL running
- Check DATABASE_URL di .env
- Verify database sudah dibuat

### API not responding
- Check backend server berjalan di port 6543
- Verify API keys di .env valid
- Check CORS headers

### Sentiment analysis error
- Verify Hugging Face API key
- Check internet connection
- API rate limit mungkin tercapai

### Key point extraction error
- Verify Gemini API key valid
- Check Google API quota
- Review text mungkin terlalu pendek

```bash
### Nama : Zahwa natasya hamzah
### NIM : 123140069
```
