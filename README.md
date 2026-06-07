# PC Audio Streamer (Uso Hogareño)

Este programa captura el audio de tu PC y lo manda a tu celular para que lo escuches en un parlante Bluetooth. Funciona perfecto con **PDAnet**, **VPN** o tu red **Wi-Fi**.

## Pasos para usarlo:

1. **PRIMERA VEZ:** Haz doble clic en el archivo `instalar.bat`.
   - Esto descargará lo necesario (ffmpeg) e instalará el programa.
   - Si Windows te pregunta, dale permiso para descargar.

2. **PARA USARLO:** Haz doble clic en el archivo `run.bat`.
   - Se abrirá una ventana negra con letras blancas.
   - Busca donde dice algo como: `http://192.168.49.1:4000`.

3. **EN EL CELULAR:**
   - Abre el navegador de tu celular (Chrome, Safari, etc).
   - Escribe la dirección que viste arriba (ejemplo: `192.168.49.1:4000`).
   - Toca el botón azul **"Conectar / Reproducir"**.
   - ¡Listo! Deberías escuchar el audio de tu PC en el celular.

## Uso con ngrok (Acceso Remoto)

Si quieres escuchar el audio fuera de tu casa o red local, puedes usar **ngrok**:

1. Descarga ngrok y abre una terminal.
2. Ejecuta: `ngrok http 4000`.
3. Copia la dirección `Forwarding` (ej: `https://abcd-123.ngrok-free.app`).
4. Abre esa dirección en tu celular.
   - *Nota:* La primera vez que abras el sitio, ngrok mostrará una advertencia. Haz clic en el botón azul **"Visit Site"** para permitir la conexión de audio (WebSockets).

## Problemas Comunes:

- **No se escucha nada:**
  1. Asegúrate de que tu PC esté reproduciendo sonido.
  2. Por defecto se captura el dispositivo de "Grabación" predeterminado. Para capturar la salida de audio (lo que escuchas), puede que necesites configurar el "Mezcla estéreo" (Stereo Mix) como dispositivo predeterminado en Windows o usar un cable virtual.
- **El celular no conecta:** Revisa que el celular esté conectado a la PC (por PDAnet o el mismo Wi-Fi).
- **Error de ffmpeg:** Ejecuta de nuevo el `instalar.bat`.

---
*Nota: Este programa es solo para uso personal. Requiere tener Node.js instalado en la PC.*
