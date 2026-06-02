const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 4000;

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Función para obtener la IP local
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

  // Comando de ffmpeg para capturar audio de WASAPI loopback en Windows
  // Usamos formato PCM de 16 bits, 44100Hz, estereo
  // IMPORTANTE: El dispositivo "default" suele funcionar, pero a veces hay que especificar el nombre real.
  const ffmpeg = spawn('ffmpeg', [
    '-f', 'wasapi',
    '-i', 'default', // Captura el dispositivo de reproducción por defecto
    '-acodec', 'pcm_s16le',
    '-f', 's16le',
    '-ac', '2',
    '-ar', '44100',
    '-'
  ]);

  ffmpeg.on('error', (err) => {
    console.error('Error al iniciar ffmpeg:', err.message);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ error: 'ffmpeg no encontrado o error al iniciar' }));
    }
  });

  ffmpeg.stdout.on('data', (data) => {
    // Enviar datos binarios de audio por WebSocket
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });

  ffmpeg.stderr.on('data', (data) => {
    // Log de ffmpeg (opcional, útil para debugging)
    // console.log(`ffmpeg: ${data}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
    if (ffmpeg.exitCode === null) ffmpeg.kill();
  });

  ws.on('error', (err) => {
    console.error('Error en WebSocket:', err);
    ffmpeg.kill();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`--------------------------------------------------`);
  console.log(`Servidor de audio iniciado!`);
  console.log(`Accede desde tu celular en: http://${ip}:${PORT}`);
  console.log(`--------------------------------------------------`);
});
