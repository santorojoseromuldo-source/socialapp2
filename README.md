# Delivery Plus

Sistema de gestión de entregas con Flutter y Node.js.

## Requisitos
- Flutter 3.x
- Node.js v18+
- npm

## Estructura
- `delivery_plus/`: Frontend (Flutter MVVM).
- `backend/`: API REST (Node.js/Express + SQLite).

## Ejecución Local

### 1. Iniciar el Backend
```bash
cd backend
npm install
node server.js
```
API corre en: `http://localhost:3000`

### 2. Iniciar el Frontend (Flutter Web)
```bash
cd delivery_plus
flutter pub get
flutter run -d chrome
```

## Endpoints Principales
- `POST /api/auth/register`: Registro (name, email, password, role).
- `POST /api/auth/login`: Autenticación JWT.
- `GET /api/products`: Lista de productos.
- `POST /api/orders`: Crear pedido (customer_id, business_id, total).

## Arquitectura
- **Frontend**: MVVM con Provider.
- **Backend**: MVC con SQLite.
- **Temas**: Oscuro futurista (DeliveryPlusTheme).
