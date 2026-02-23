## Inventory Frontend

## Read this documentation in English:
[🇺🇸 English README](./README.md)

Aplicación frontend para el sistema de gestión de inventarios, desarrollada con React + Vite, que consume la Inventory API mediante peticiones HTTP autenticadas con JWT.

Este proyecto permite gestionar productos, controlar stock, registrar movimientos de entrada y salida, y visualizar el historial de movimientos desde una interfaz moderna, clara y funcional.

## Demo en Producción

Frontend desplegado:
https://inventory-frontend-eight-pink.vercel.app

## Acceso de Prueba

Existe una cuenta demo con rol Administrador para probar la gestión completa del sistema.

Si necesitas credenciales de acceso, puedes solicitarlas al autor.


## Tecnologías utilizadas

React

Vite

JavaScript (ES6+)

Axios

CSS

JWT (autenticación)

Context API

## Estructura del proyecto

```bash 
inventory-frontend/
├── src/
│   ├── api/
│   │   ├── axios.js           
│   │   ├── products.js       
│   │   └── stockMovements.js  
│   ├── context/
│   │   └── AuthContext.jsx    
│   ├── pages/
│   │   ├── Login.jsx         
│   │   └── Dashboard.jsx      
│   ├── styles/
│   │   └── dashboard.css      
│   ├── App.jsx                
│   └── main.jsx               
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
└── README.es.md
```

## Autenticación

El frontend utiliza JWT para la autenticación de usuarios.

Flujo básico:

El usuario inicia sesión desde la pantalla de login

El backend devuelve un token JWT

El token se guarda en localStorage

Axios envía automáticamente el token en cada petición protegida

## Roles y experiencia de usuario
 
## Admin

Crear, editar y eliminar productos

Registrar entradas y salidas de stock

Visualizar alertas de stock bajo

Consultar el historial completo de movimientos

## Usuario

Visualizar productos

Consultar historial de movimientos

## Funcionalidades principales

Login con autenticación JWT

CRUD de productos

Registro de movimientos de stock (entrada / salida)

Alertas visuales de stock bajo

Visualización y filtrado de movimientos

Cierre de sesión seguro

## Variables de entorno

Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=https://inventory-backend-production.up.railway.app/api

## Ejecutar en Local

Instalar dependencias:

npm install


Ejecutar en modo desarrollo:

npm run dev


Aplicación disponible en:

http://localhost:5174


(El puerto puede variar según Vite)

## Proyecto Relacionado

Repositorio del backend:

https://github.com/erikescofar19/inventory-backend



## Estado del proyecto

- Aplicación desplegada en producción
- Integrado con backend
- Autenticado con JWT
- Control de acceso por roles
- Listo para portafolio

## Autor

Erik Eduardo Escobar Farías

Proyecto frontend desarrollado como práctica profesional con React, enfocado en consumo de APIs REST, manejo de estado, autenticación y experiencia de usuario.