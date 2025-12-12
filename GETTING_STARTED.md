# Getting Started Guide

## Quick Start (Windows)

### 1. Initial Setup
```bash
setup.bat
```

### 2. Database Setup
Pastikan PostgreSQL running, kemudian:
```bash
cd backend
python models.py
```

### 3. Start Backend
```bash
start_backend.bat
```
Server akan berjalan di `http://localhost:6543`

### 4. Start Frontend (terminal baru)
```bash
start_frontend.bat
```
Aplikasi akan buka di `http://localhost:3000`

---

## Manual Setup

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate

# Windows
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

## Configuration

### Backend (.env file)
```
GEMINI_API_KEY=AIzaSyCC8UN28KsF1VgIlAzIJsQYfnj8SJgHdaU
HUGGINGFACE_API_KEY=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
DATABASE_URL=postgresql://postgres:password@localhost:5432/product_reviews
ENVIRONMENT=development
```

### Database Setup
```sql
-- Create database
CREATE DATABASE product_reviews;

-- Connect to database
\c product_reviews

-- Tables will be created automatically by SQLAlchemy
```

---

## API Testing

### Using cURL

**Analyze Review:**
```bash
curl -X POST http://localhost:6543/api/analyze-review \
  -H "Content-Type: application/json" \
  -d "{
    \"review_text\": \"This product is excellent! Highly recommended.\",
    \"product_name\": \"Amazing Product\"
  }"
```

**Get All Reviews:**
```bash
curl http://localhost:6543/api/reviews
```

### Using Postman
1. Import the requests
2. POST to `http://localhost:6543/api/analyze-review`
3. GET from `http://localhost:6543/api/reviews`

---

## Troubleshooting

### PostgreSQL Connection Error
```
Error: could not connect to server: Connection refused

Solution:
- Start PostgreSQL service
- Check DATABASE_URL in .env
- Verify database exists
```

### Python Module Not Found
```
ModuleNotFoundError: No module named 'pyramid'

Solution:
- Activate virtual environment: venv\Scripts\activate
- Install dependencies: pip install -r requirements.txt
```

### Gemini/Hugging Face API Errors
```
Error: Invalid API key

Solution:
- Verify API keys in .env are correct
- Check API quotas in respective dashboards
- Ensure internet connection is working
```

### Port Already in Use
```
ERROR: Port 6543 already in use
ERROR: Port 3000 already in use

Solution:
- Kill process using the port
- Or change port in app.py / package.json
```

---

## Development Tips

### Frontend
- Edit `src/App.js` for main component
- Edit `src/components/` for UI components
- Use Tailwind CSS for styling
- Hot reload enabled by default

### Backend
- Edit `views.py` for API endpoints
- Edit `services.py` for business logic
- Edit `models.py` for database models
- Restart server after changes

### Database
- View tables: `\dt` in PostgreSQL
- Query reviews: `SELECT * FROM reviews;`
- Clear data: `DELETE FROM reviews;`

---

## Performance Tips

1. **API Rate Limiting**
   - Implement request throttling
   - Add caching for common reviews

2. **Database**
   - Add indexes on frequently queried columns
   - Implement pagination for large datasets

3. **Frontend**
   - Enable gzip compression
   - Lazy load components
   - Optimize images

---

## Security Considerations

1. **API Keys**
   - Never commit .env file
   - Use environment variables in production
   - Rotate keys regularly

2. **Database**
   - Use strong password for PostgreSQL
   - Enable SSL for connections
   - Regular backups

3. **Frontend**
   - Sanitize user input
   - Use HTTPS in production
   - Implement CSRF protection

---

## Deployment

### Production Checklist
- [ ] Set ENVIRONMENT=production
- [ ] Use strong database password
- [ ] Setup SSL/HTTPS
- [ ] Configure environment variables
- [ ] Setup logging and monitoring
- [ ] Enable CORS properly
- [ ] Test all endpoints
- [ ] Backup database

### Deployment Platforms
- **Backend:** Heroku, Railway, Render
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** AWS RDS, Heroku Postgres, Digital Ocean

---

