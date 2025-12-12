@echo off
cd /d "C:\Users\msi\marketplace-soap-app"
echo ========================================
echo MARKETPLACE SOAP APP - HADIL YOUSSFI
echo ========================================
echo.
echo Demarrage en cours...
echo.

echo 1. Demarrage du backend...
cd backend
start "Backend SOAP" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul

echo 2. Demarrage du frontend...
cd ..\frontend
start "Frontend Angular" cmd /k "ng serve"
timeout /t 5 /nobreak >nul

echo.
echo ✅ Applications demarrees!
echo Frontend: http://localhost:4200
echo Backend:  http://localhost:8080
echo.
echo Appuyez sur une touche pour fermer...
pause >nul