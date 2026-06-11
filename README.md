# Delivery Plus

Sistema de gestión de entregas con Flutter y Node.js.

## Requisitos
- Flutter 3.x
- Node.js v18+
- npm

## Estructura
- `delivery_plus/`: Frontend (Flutter).
- `backend/`: API REST (Node.js/Express).

## Ejecución Local

### Backend
1. Ir a la carpeta: `cd backend`
2. Instalar: `npm install`
3. Iniciar: `node server.js` o `npm start`
   - Corre en: `http://localhost:3000`

### Frontend (Flutter)
1. Ir a la carpeta: `cd delivery_plus`
2. Instalar dependencias: `flutter pub get`
3. Ejecutar: `flutter run -d chrome` (para web) o `flutter run` (para móvil).

## Endpoints Disponibles
- `POST /api/auth/register`: Registro de usuarios.
- `POST /api/auth/login`: Autenticación JWT.
- `GET /products`: Listado de productos.

## Arquitectura
Frontend usa **MVVM** con **Provider** para la gestión de estado.
Base de datos local **SQLite**.
