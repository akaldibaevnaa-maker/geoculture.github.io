@echo off
chcp 65001 > nul
title GeoCulture AI - Школа №290
echo ===================================================
echo     GeoCulture AI Платформасы іске қосылуда...
echo     Запуск платформы GeoCulture AI...
echo ===================================================
echo.
echo Сайт ашылуда: http://localhost:3000
echo.

start http://localhost:3000
npm run dev