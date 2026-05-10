@echo off
echo.
echo ============================================
echo Travel App - Full Stack Startup
echo ============================================
echo.
echo Starting Backend Server (Terminal 1)...
echo.
start cmd /k "cd backend && npm run dev"
echo.
timeout /t 3
echo.
echo Starting Frontend Server (Terminal 2)...
echo.
start cmd /k "npm run dev"
echo.
echo ============================================
echo Both servers are starting!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Open your browser and go to http://localhost:5173
echo Keep both terminals open while using the app.
echo.
echo Press Ctrl+C in each terminal to stop.
echo ============================================
echo.
pause
