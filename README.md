# Delivery Plus

Proyecto de sistema de entregas con Flutter (Frontend) y Node.js (Backend).

## Requisitos
- Flutter 3.x
- Node.js v18+
- npm

## Estructura del Proyecto
- `delivery_plus/`: Aplicación Flutter.
- `backend/`: Servidor API con Node.js y SQLite.

## Instrucciones para levantar el proyecto localmente

### 1. Levantar el Backend
Navega a la carpeta del backend e instala las dependencias:
```bash
cd backend
npm install
```
Crea un archivo `.env` (si no existe) con:
```env
PORT=4000
JWT_SECRET=delivery_plus_secret_key
```
Inicia el servidor:
```bash
npm start
```
El servidor correrá en `http://localhost:4000`.

### 2. Ejecutar la Aplicación Flutter (Web)
Navega a la carpeta de Flutter:
```bash
cd delivery_plus
```
Instala las dependencias:
```bash
flutter pub get
```
Ejecuta la aplicación en el navegador:
```bash
flutter run -d chrome
```

## Características Implementadas
- **Arquitectura**: MVVM en Flutter.
- **Autenticación**: JWT con roles (usuario, negocio, repartidor, emprendedor).
- **Base de Datos**: SQLite para persistencia local del backend.
- **UI**: Estilo futurista oscuro (Negro/Azul/Gris).
- **Integraciones**: Soporte para Google Maps y Clima (OpenWeather).
