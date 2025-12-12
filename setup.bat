@echo off
echo ==========================================
echo Product Review Analyzer - Setup Script
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Setup Backend
echo.
echo [1/4] Setting up Backend...
cd backend

REM Create virtual environment
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Initialize database
echo Initializing database...
python models.py

cd..

REM Setup Frontend
echo.
echo [2/4] Setting up Frontend...
cd frontend

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js/npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Install npm dependencies
echo Installing Node dependencies...
npm install

cd..

REM Create startup scripts
echo.
echo [3/4] Creating startup scripts...

REM Backend startup script
(
    echo @echo off
    echo cd backend
    echo call venv\Scripts\activate.bat
    echo python run_server.py
) > start_backend.bat

REM Frontend startup script
(
    echo @echo off
    echo cd frontend
    echo npm start
) > start_frontend.bat

echo.
echo [4/4] Setup Complete!
echo.
echo ==========================================
echo Next Steps:
echo ==========================================
echo.
echo 1. Configure your APIs in backend\.env
echo    - GEMINI_API_KEY
echo    - HUGGINGFACE_API_KEY
echo    - DATABASE_URL (if not localhost)
echo.
echo 2. Make sure PostgreSQL is running
echo.
echo 3. Run the backend:
echo    - Run: start_backend.bat
echo    - Or: cd backend ^&^& python run_server.py
echo.
echo 4. In another terminal, run the frontend:
echo    - Run: start_frontend.bat
echo    - Or: cd frontend ^&^& npm start
echo.
echo 5. Open http://localhost:3000 in your browser
echo.
echo ==========================================
pause
