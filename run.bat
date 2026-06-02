@echo off
setlocal
title PC Audio Streamer - Servidor

echo.
echo ==========================================
echo    Iniciando PC Audio Streamer
echo ==========================================
echo.

:: Verificar si Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH.
    pause
    exit /b 1
)

:: Verificar si ffmpeg esta instalado
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo [ALERTA] ffmpeg no se encontro en el PATH.
    echo Asegurate de tenerlo instalado para que la captura funcione.
    echo.
)

:: Instalar dependencias si falta node_modules
if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo Lanzando servidor...
node server.js

pause
