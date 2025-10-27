# JWT-MongoDB-OAuth

Este repositorio contiene una API Express (con MongoDB) y una SPA en React (Vite) para gestionar un CRUD de personas y autenticación JWT. Se añadió integración opcional con Google OAuth para login/registro con cuenta Google.

## Contenido
- `Express-server/` — backend (Express + Mongoose)
- `ReactWithForm/` — frontend (Vite + React)
- `docker-compose.yml` — orquesta servicios (mongo, express, react)

## Requisitos
- Docker y Docker Compose 
- Cuenta Google para crear credenciales OAuth (Client ID / Client Secret)

## Variables de entorno (`.env`)
Coloca un archivo llamado `.env` en la raíz del proyecto (mismo nivel que `docker-compose.yml`). Nunca subas este archivo al repositorio.

Ejemplo (`.env`):

```
# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Frontend URL (donde se redirige tras login)
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb://toledo:123@mongo:27017/Practica4?authSource=admin

# JWT secret
JWT_SECRET=una_clave_segura
```

Descripción de las variables principales:
- `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`: credenciales generadas en Google Cloud Console.
- `GOOGLE_CALLBACK_URL`: la URL de callback que registras en Google.
- `FRONTEND_URL`: URL donde corre el frontend (Vite) — se usa para redirigir con el token.
- `MONGODB_URI`: string de conexión a MongoDB.
- `JWT_SECRET`: clave para firmar tokens JWT.

### Cómo obtener Client ID y Client Secret 
1. Entra a https://console.cloud.google.com/apis/credentials
2. Crea o selecciona un proyecto.
3. Configura la "OAuth consent screen" (External o Internal según tu caso).
4. Ve a "Credentials" → "Create Credentials" → "OAuth client ID" → "Web application".
5. En "Authorized redirect URIs" añade exactamente: `http://localhost:3000/auth/google/callback` (o la que uses).
6. Crea y copia `Client ID` y `Client Secret` a tu `.env`.

## Ejecutar con Docker Compose 
1. Crea `.env` en la raíz con los valores (Docker Compose carga automáticamente `.env`).
2. Arranca los servicios:

```bash
docker compose up -d --build
```

3. Ver logs del backend:

```bash
docker compose logs express --follow
```

4. Frontend estará en `http://localhost:5173` y backend en `http://localhost:3000`.

## Ejecutar local (sin Docker)

Backend:
```bash
cd Express-server
npm install
node server.js
# o con nodemon
npx nodemon server.js
```

Frontend:
```bash
cd ReactWithForm
npm install
npm run dev
```

## Flow de Google OAuth (cómo funciona aquí)
- El frontend tiene botones que abren `GET /auth/google` en el backend.
- Backend usa Passport (passport-google-oauth20) para iniciar OAuth con Google.
- Tras aceptar en Google, Google redirige a `/auth/google/callback` en el backend.
- Si todo OK, el backend firma un JWT y redirige al `FRONTEND_URL` con el token en el fragmento de la URL: `http://localhost:5173/#token=...`.
- El frontend lee el `#token` en `AuthContext` y lo guarda en `localStorage`.

## Probar manualmente
- Abrir `http://localhost:5173` → pantalla de Login/Registro → pulsar "Iniciar con Google".
- Alternativa directa: `http://localhost:3000/auth/google` (inicia flujo OAuth).

## Debugging y errores comunes
- Si al abrir `/auth/google` ves un mensaje: "Error de configuración: GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET no están definidas": revisa que tu `.env` existe en la raíz y que `docker compose` fue reiniciado.
- Si Google muestra `redirect_uri_mismatch`, verifica que la URL exacta del callback está registrada en Google Console.
- Revisa logs del backend:

```bash
docker compose logs express --tail 200
```