const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

function getFFmpegPath() {
    const localFFmpeg = path.join(__dirname, 'ffmpeg.exe');
    if (fs.existsSync(localFFmpeg)) {
        return localFFmpeg;
    }
    return 'ffmpeg';
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  const ffmpegPath = getFFmpegPath();

  // Usamos "loopback=true" o "audio_device_number" dependiendo de la version,
  // pero lo mas robusto para capturar salida en WASAPI es usar el nombre del dispositivo de renderizado.
  // Como no sabemos el nombre exacto, usamos "default" con loopback activado via dshow o wasapi.
  // En WASAPI, capturar el dispositivo de reproduccion por defecto se hace asi:
  const ffmpeg = spawn(ffmpegPath, [
    '-f', 'wasapi',
    '-i', 'default',
    '-loopback', '1', // Intentar forzar loopback si el driver lo soporta
    '-acodec', 'pcm_s16le',
    '-f', 's16le',
    '-ac', '2',
    '-ar', '44100',
    '-'
  ]);

  ffmpeg.on('error', (err) => {
    console.error('Error al iniciar ffmpeg:', err.message);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ error: `Error de FFmpeg: ${err.message}. Ejecuta instalar.bat.` }));
    }
  });

  ffmpeg.stdout.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
    if (ffmpeg.exitCode === null) ffmpeg.kill();
  });

  ws.on('error', (err) => {
    console.error('Error en WebSocket:', err);
    if (ffmpeg.exitCode === null) ffmpeg.kill();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`==================================================`);
  console.log(`       SERVIDOR DE AUDIO INICIADO`);
  console.log(`==================================================`);
  console.log(`URL para el celular: http://${ip}:${PORT}`);
  console.log(`==================================================`);
});
