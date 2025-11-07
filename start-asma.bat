@echo off
echo ========================================
echo MARKETPLACE - ASMA SAGHROUNI
echo ========================================
echo.
echo Demarrage du frontend Angular...
echo Assurez-vous que le backend tourne sur localhost:8080
echo.

cd frontend

echo Verification des dependances...
npm install

echo.
echo Demarrage d'Angular...
echo Frontend: http://localhost:4200
echo.
ng serve

echo.
echo Appuyez sur une touche pour fermer...
pause >nul