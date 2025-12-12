# 🚀 QUICK START GUIDE

## For Windows Users 💻

### Step 1: Initial Setup (One Time)
```bash
cd d:\Tugas3_Pemweb_069
setup.bat
```
This will install all dependencies. Wait for completion (5-10 minutes).

### Step 2: Start Backend Server
```bash
start_backend.bat
```
You should see:
```
Starting Pyramid server at http://0.0.0.0:6543
API endpoints:
  POST /api/analyze-review
  GET /api/reviews
```

### Step 3: Start Frontend (New Terminal)
```bash
start_frontend.bat
```
Browser will automatically open to `http://localhost:3000`

### Step 4: Test Application
1. Input a product review (at least 10 characters)
2. Optionally enter product name
3. Click "Analyze Review"
4. View sentiment analysis result and key points

---

## For Linux/macOS Users 🐧

### Step 1: Initial Setup
```bash
cd ~/path/to/Tugas3_Pemweb_069
chmod +x setup.sh
./setup.sh
```

### Step 2: Start Backend
```bash
./start_backend.sh
```

### Step 3: Start Frontend (New Terminal)
```bash
./start_frontend.sh
```

### Step 4: Open Browser
Navigate to `http://localhost:3000`

---

## Manual Setup (If Needed) ⚙️

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
python models.py
python run_server.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## Ports Used 📡

- **Backend:** http://localhost:6543
- **Frontend:** http://localhost:3000
- **Database:** localhost:5432 (PostgreSQL)

---

## API Examples 📚

### Using cURL
```bash
# Analyze a review
curl -X POST http://localhost:6543/api/analyze-review \
  -H "Content-Type: application/json" \
  -d '{"review_text":"This product is amazing!", "product_name":"Test"}'

# Get all reviews
curl http://localhost:6543/api/reviews
```

### Using Postman
1. New request: POST http://localhost:6543/api/analyze-review
2. Body (raw JSON):
```json
{
  "review_text": "This is an amazing product!",
  "product_name": "My Product"
}
```

---

## Troubleshooting 🔧

### Error: Database connection refused
→ Make sure PostgreSQL is running

### Error: Port already in use
→ Another app is using the port. Close it or change port.

### Error: Module not found
→ Activate virtual environment: `venv\Scripts\activate`

### Error: npm not found
→ Install Node.js from https://nodejs.org/

### Error: API returns error
→ Check API keys in `backend/.env`

---

## Documentation 📖

- **README.md** - Full project documentation
- **API_DOCUMENTATION.md** - API reference
- **GETTING_STARTED.md** - Detailed setup
- **PROJECT_SUMMARY.md** - Project overview

---

## File Locations 📁

- **Backend files:** `backend/`
- **Frontend files:** `frontend/src/`
- **Configuration:** `backend/.env`
- **Database models:** `backend/models.py`
- **API endpoints:** `backend/views.py`

---

## That's It! 🎉

Your application is now running!

- Frontend: http://localhost:3000
- Backend API: http://localhost:6543

Start using the Product Review Analyzer! 🚀
