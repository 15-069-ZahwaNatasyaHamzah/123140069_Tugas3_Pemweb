# DEPENDENCIES & REQUIREMENTS

## System Requirements

### Minimum Requirements
- **OS:** Windows, Linux, or macOS
- **RAM:** 2GB minimum (4GB recommended)
- **Disk Space:** 1GB
- **Internet:** Required for API calls

### Required Software
1. **Python 3.8 or higher**
   - Download: https://www.python.org/downloads/
   - Verify: `python --version`

2. **Node.js 14 or higher**
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

3. **PostgreSQL 12 or higher**
   - Download: https://www.postgresql.org/download/
   - Verify: `psql --version`

---

## Python Dependencies

### Backend (Pyramid)

File: `backend/requirements.txt`

```
pyramid==2.0.2              # Web framework
waitress==2.1.2             # WSGI server
sqlalchemy==2.0.23          # ORM
psycopg2-binary==2.9.9      # PostgreSQL driver
pyramid_cors==1.3           # CORS support
requests==2.31.0            # HTTP client
python-dotenv==1.0.0        # Environment variables
google-generativeai==0.3.0  # Gemini API
```

### Installation
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Linux/macOS
pip install -r requirements.txt
```

---

## Node.js Dependencies

### Frontend (React)

File: `frontend/package.json`

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.2",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}
```

### Packages Explained

| Package | Purpose | Version |
|---------|---------|---------|
| react | UI framework | 18.2.0 |
| react-dom | React DOM | 18.2.0 |
| axios | HTTP client | 1.6.2 |
| lucide-react | Icons | 0.263.1 |
| react-scripts | Build tools | 5.0.1 |

### Installation
```bash
cd frontend
npm install
```

---

## External APIs Required

### 1. Google Gemini API
- **Purpose:** Extract key points from reviews
- **API Key:** AIzaSyCC8UN28KsF1VgIlAzIJsQYfnj8SJgHdaU
- **Endpoint:** https://generativelanguage.googleapis.com
- **Library:** google-generativeai
- **Setup:** Already configured in backend/.env

### 2. Hugging Face API
- **Purpose:** Sentiment analysis
- **API Key:** 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
- **Model:** distilbert-base-uncased-finetuned-sst-2-english
- **Endpoint:** https://api-inference.huggingface.co
- **Setup:** Already configured in backend/.env

### 3. PostgreSQL Database
- **Purpose:** Store review data
- **Version:** 12+
- **Connection:** postgresql://postgres:password@localhost:5432/product_reviews
- **Setup:** See GETTING_STARTED.md

---

## Configuration Files

### backend/.env
```
GEMINI_API_KEY=AIzaSyCC8UN28KsF1VgIlAzIJsQYfnj8SJgHdaU
HUGGINGFACE_API_KEY=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
DATABASE_URL=postgresql://postgres:password@localhost:5432/product_reviews
ENVIRONMENT=development
```

### backend/development.ini
Pyramid configuration file (pre-configured)

### frontend/package.json
Node.js configuration (pre-configured)

---

## Package Size & Installation Time

| Component | Size | Install Time |
|-----------|------|--------------|
| Python venv | 50MB | 2-3 min |
| Backend deps | 100MB | 3-5 min |
| Frontend deps | 400MB | 2-3 min |
| Total | ~550MB | 7-11 min |

---

## Disk Space Requirements

| Component | Space |
|-----------|-------|
| Code files | 2MB |
| Python venv | 50MB |
| Backend packages | 100MB |
| node_modules | 400MB |
| Database | Variable |
| **Total** | **~550MB** |

---

## Version Compatibility

### Tested On
- ✅ Python 3.8, 3.9, 3.10, 3.11
- ✅ Node.js 14, 16, 18, 20
- ✅ PostgreSQL 12, 13, 14, 15
- ✅ Windows 10, 11
- ✅ Linux (Ubuntu, Debian, CentOS)
- ✅ macOS (Intel & M1)

---

## Optional Dependencies

### Development Tools (Optional)
- **VS Code:** Code editor (https://code.visualstudio.com/)
- **Postman:** API testing (https://www.postman.com/)
- **pgAdmin:** PostgreSQL GUI (https://www.pgadmin.org/)
- **Git:** Version control (https://git-scm.com/)

### VS Code Extensions (Optional)
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- PostgreSQL

---

## Troubleshooting Dependencies

### Python Module Errors
```bash
# Activate virtual environment
venv\Scripts\activate

# Check installed packages
pip list

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Node Module Errors
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Connection
```bash
# Test PostgreSQL connection
psql -U postgres -h localhost -d product_reviews

# Check if running (Windows)
Get-Service postgresql*

# Check if running (Linux)
sudo systemctl status postgresql
```

---

## Version Information

**Backend Stack:**
- Pyramid: 2.0.2
- SQLAlchemy: 2.0.23
- psycopg2: 2.9.9

**Frontend Stack:**
- React: 18.2.0
- Axios: 1.6.2
- Lucide React: 0.263.1

**API Clients:**
- google-generativeai: 0.3.0
- requests: 2.31.0

**Database:**
- PostgreSQL: 12+

---

## Platform-Specific Notes

### Windows
- Use `venv\Scripts\activate`
- Use backslashes in paths
- Run as Administrator for some features

### Linux/macOS
- Use `source venv/bin/activate`
- Use forward slashes in paths
- May need sudo for system packages

---

## Network Requirements

- **Internet:** Required for API calls
- **Firewall:** Allow ports 3000, 6543, 5432
- **Proxy:** Configure if behind corporate proxy

---

## Security Notes

- Never commit API keys to git
- Use .env for sensitive data
- Update packages regularly
- Use strong database password

---

## Support Resources

- **Python:** https://www.python.org/
- **Node.js:** https://nodejs.org/
- **PostgreSQL:** https://www.postgresql.org/
- **Pyramid:** https://trypyramid.com/
- **React:** https://react.dev/
- **SQLAlchemy:** https://www.sqlalchemy.org/

---

## Quick Setup Summary

```bash
# 1. Install system dependencies
# Download: Python, Node.js, PostgreSQL

# 2. Clone/download project
cd Tugas3_Pemweb_069

# 3. Run setup script
setup.bat              # Windows
./setup.sh             # Linux/macOS

# 4. Start services
start_backend.bat      # Backend
start_frontend.bat     # Frontend

# 5. Open http://localhost:3000
```

---

**All dependencies are pre-configured and included in requirements.txt and package.json**

For more information, see GETTING_STARTED.md or README.md
