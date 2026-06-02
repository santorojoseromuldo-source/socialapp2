# PC Audio Streamer

Esta aplicación permite capturar el audio de tu PC con Windows y transmitirlo a tu celular a través de una red local o VPN (como PDAnet).

## Requisitos

1. **ffmpeg**: Debes tener instalado `ffmpeg` en tu PC.
   - Puedes descargarlo de [ffmpeg.org](https://ffmpeg.org/download.html).
   - Asegúrate de agregar la carpeta `bin` de ffmpeg a tu variable de entorno PATH.
2. **Node.js**: Instalado en tu PC.

## Configuración de Audio en Windows

Para capturar el audio del sistema, usamos WASAPI loopback. Necesitas saber el nombre de tu dispositivo de salida.

1. Abre una terminal y ejecuta:
   ```bash
   ffmpeg -list_devices true -f dshow -i dummy
   ```
2. Busca en la sección "[dshow @ ...]" los nombres de tus dispositivos bajo "DirectShow audio devices".
3. Busca tu parlante o salida de audio (ej: "Speakers (Realtek High Definition Audio)").

## Ejecución

1. Ejecuta el archivo `run.bat` o usa:
   ```bash
   npm start
   ```
2. La terminal mostrará una dirección IP (ej: `http://192.168.49.1:4000`).
3. Abre esa dirección en el navegador de tu celular.
4. Presiona **"Conectar / Reproducir"** en el celular.

## Notas sobre PDAnet / VPN / Latencia

- **Red Local:** Asegúrate de que el celular esté conectado a la PC mediante PDAnet o que ambos estén en la misma red Wi-Fi.
- **IP:** Usa la dirección IP que muestra el programa al iniciar. Si usas PDAnet, suele ser `192.168.49.1`.
- **Latencia:** La aplicación usa PCM sin comprimir para que el retraso sea mínimo (milisegundos). La calidad depende de la estabilidad de tu conexión USB/Wi-Fi.
- **Bluetooth:** Una vez que el audio suene en tu celular, simplemente conéctalo a tu parlante Bluetooth.
