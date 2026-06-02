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

## Problemas Comunes:

- **No se escucha nada:** Asegúrate de que tu PC esté reproduciendo música o algún sonido.
- **El celular no conecta:** Revisa que el celular esté conectado a la PC (por PDAnet o el mismo Wi-Fi).
- **Error de ffmpeg:** Ejecuta de nuevo el `instalar.bat`.

---
*Nota: Este programa es solo para uso personal. Requiere tener Node.js instalado en la PC.*
