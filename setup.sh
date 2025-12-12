#!/bin/bash

echo "=========================================="
echo "Product Review Analyzer - Setup Script"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    exit 1
fi

# Setup Backend
echo ""
echo "[1/4] Setting up Backend..."
cd backend

# Create virtual environment
if [ ! -d venv ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Initialize database
echo "Initializing database..."
python models.py

cd ..

# Setup Frontend
echo ""
echo "[2/4] Setting up Frontend..."
cd frontend

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: Node.js/npm is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Install npm dependencies
echo "Installing Node dependencies..."
npm install

cd ..

# Create startup scripts
echo ""
echo "[3/4] Creating startup scripts..."

# Backend startup script
cat > start_backend.sh << 'EOF'
#!/bin/bash
cd backend
source venv/bin/activate
python run_server.py
EOF
chmod +x start_backend.sh

# Frontend startup script
cat > start_frontend.sh << 'EOF'
#!/bin/bash
cd frontend
npm start
EOF
chmod +x start_frontend.sh

echo ""
echo "[4/4] Setup Complete!"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Configure your APIs in backend/.env"
echo "   - GEMINI_API_KEY"
echo "   - HUGGINGFACE_API_KEY"
echo "   - DATABASE_URL (if not localhost)"
echo ""
echo "2. Make sure PostgreSQL is running"
echo ""
echo "3. Run the backend:"
echo "   - Run: ./start_backend.sh"
echo "   - Or: cd backend && python run_server.py"
echo ""
echo "4. In another terminal, run the frontend:"
echo "   - Run: ./start_frontend.sh"
echo "   - Or: cd frontend && npm start"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "=========================================="
