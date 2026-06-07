const playBtn = document.getElementById('playBtn');
const dot = document.getElementById('dot');
const statusText = document.getElementById('statusText');

let audioContext;
let ws;
let startTime = 0;
const bufferTime = 0.1; // 100ms de buffer inicial para suavizar el jitter

playBtn.addEventListener('click', () => {
    if (audioContext) return; // Ya iniciado

    // Iniciar Web Audio API (debe ser por interacción del usuario)
    audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 44100
    });

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${window.location.host}`);
    ws.binaryType = 'arraybuffer';

    statusText.innerText = 'Conectando...';
    playBtn.disabled = true;

    ws.onopen = () => {
        statusText.innerText = 'Transmitiendo audio...';
        dot.classList.add('active');
        startTime = audioContext.currentTime + bufferTime;
    };

    ws.onmessage = (event) => {
        if (typeof event.data === 'string') {
            try {
                const msg = JSON.parse(event.data);
                if (msg.error) {
                    statusText.innerText = msg.error;
                    dot.classList.remove('active');
                }
            } catch(e) {}
            return;
        }
        const arrayBuffer = event.data;
        playBuffer(arrayBuffer);
    };

    ws.onclose = () => {
        statusText.innerText = 'Desconectado';
        dot.classList.remove('active');
        playBtn.disabled = false;
        audioContext = null;
    };

    ws.onerror = (err) => {
        console.error('Error WebSocket:', err);
        statusText.innerText = 'Error de conexión';
    };
});

function playBuffer(arrayBuffer) {
    // El audio viene como s16le (16-bit PCM Signed Little Endian)
    // Necesitamos convertirlo a Float32 para Web Audio API
    const int16Array = new Int16Array(arrayBuffer);
    const numberOfSamples = int16Array.length / 2; // 2 canales
    const audioBuffer = audioContext.createBuffer(2, numberOfSamples, 44100);

    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel = audioBuffer.getChannelData(1);

    for (let i = 0; i < numberOfSamples; i++) {
        leftChannel[i] = int16Array[i * 2] / 32768;
        rightChannel[i] = int16Array[i * 2 + 1] / 32768;
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    // Agendar la reproducción para que sea continua
    if (startTime < audioContext.currentTime) {
        startTime = audioContext.currentTime + bufferTime;
    }
    source.start(startTime);
    startTime += audioBuffer.duration;
}
