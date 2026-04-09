# 📰 News Explorer (Full Stack)

Este proyecto es una aplicación Full Stack donde los usuarios pueden buscar noticias, registrarse/iniciar sesión y guardar artículos favoritos.

---

## 🌍 Proyecto en Producción

### Frontend

🔗 https://newexplorer.ignorelist.com

### Backend (API)

🔗 https://api.newexplorer.ignorelist.com

---

## ⚙️ Funcionalidades

- Registro e inicio de sesión con JWT
- Búsqueda de noticias usando una API externa
- Guardado de artículos por usuario
- Eliminación de artículos guardados
- Rutas protegidas
- Backend con Express + MongoDB

---

## 🛠 Tecnologías

### Frontend

- React
- React Router
- Context API
- CSS

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Celebrate / Joi
- PM2
- Nginx + SSL (Let's Encrypt)

---

## 📌 Endpoints principales

### Auth

- `POST /signup` — crear usuario
- `POST /signin` — login y retorna JWT

### Usuario

- `GET /users/me` — retorna información del usuario logueado

### Artículos

- `GET /articles` — obtener artículos guardados por el usuario
- `POST /articles` — guardar artículo
- `DELETE /articles/:articleId` — eliminar artículo por ID

---

## 🚀 Instalación (Desarrollo local)

### Backend

```bash
cd backend
npm install
npm run dev
```
