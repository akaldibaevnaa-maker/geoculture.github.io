@echo off
title GeoCulture AI
echo ===================================================
echo     GeoCulture AI Платформасын іске қосу...
echo     Запуск платформы GeoCulture AI...
echo ===================================================
echo.
echo Сервер дайындалуда, куте турыныз (Подождите, сервер запускается)...
echo.

:: Open the browser immediately (it will connect once the server is ready)
start http://localhost:3000

:: Start the Next.js development server
npm run dev
