@echo off
echo ========================================
echo MARKETPLACE SOAP APP - HADIL YOUSSFI
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:4200
echo SOAP WSDL: http://localhost:8080/ws/auth?wsdl
echo.
echo Demarrage en cours...
echo.

echo 1. Demarrage du backend Node.js...
cd backend
start "Backend SOAP" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo 2. Demarrage du frontend Angular...
cd ..\frontend
start "Frontend Angular" cmd /k "ng serve"
timeout /t 3 /nobreak >nul

echo.
echo ✅ Applications demarrees avec succes !
echo.
echo URLs importantes :
echo    Frontend: http://localhost:4200
echo    Backend:  http://localhost:8080
echo    Health:   http://localhost:8080/health
echo    WSDL:     http://localhost:8080/ws/auth?wsdl
echo.
echo Appuyez sur une touche pour fermer...
pause >nul