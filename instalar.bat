@echo off
setlocal enabledelayedexpansion
title Instalador PC Audio Streamer

echo ==========================================
echo    Instalador de PC Audio Streamer
echo ==========================================
echo.

:: 1. Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] No tienes Node.js instalado.
    echo Por favor descargalo de https://nodejs.org/ e instalalo.
    pause
    exit /b 1
)

:: 2. Instalar dependencias de Node
echo [1/3] Instalando dependencias de Node.js...
call npm install --no-package-lock

:: 3. Descargar FFmpeg si no existe
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    if not exist "ffmpeg.exe" (
        echo [2/3] FFmpeg no detectado. Descargando version portable...

        powershell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $url = 'https://github.com/eugeneware/ffmpeg-static/raw/master/ffmpeg.exe'; Invoke-WebRequest -Uri $url -OutFile 'ffmpeg.exe' }"

        if exist "ffmpeg.exe" (
            echo [+] FFmpeg descargado correctamente en la carpeta del proyecto.
        ) else (
            echo [ERROR] No se pudo descargar FFmpeg automaticamente.
            echo Por favor descarga ffmpeg.exe manualmente y ponlo en esta carpeta.
        )
    ) else (
        echo [2/3] FFmpeg ya esta en la carpeta.
    )
) else (
    echo [2/3] FFmpeg ya esta instalado en el sistema.
)

echo [3/3] Configuracion terminada.
echo.
echo ==========================================
echo   LISTO! Ahora puedes usar run.bat
echo ==========================================
echo.
pause
