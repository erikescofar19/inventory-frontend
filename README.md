## Inventory Frontend

## Read this documentation in Spanish:
[🇪🇸 README en Español](./README.es.md)

Frontend application for an inventory management system, built with React + Vite, which consumes the Inventory API through HTTP requests authenticated with JWT.

This project allows users to manage products, control stock, register stock movements (in/out), and visualize movement history through a modern and functional user interface.

## Technologies Used

React

Vite

JavaScript (ES6+)

Axios

CSS

JWT (authentication)

## Project Structure

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

## Authentication

The frontend uses JWT for user authentication.

Basic flow:

User logs in through the login screen

Backend returns a JWT token

Token is stored in localStorage

Axios automatically sends the token in every protected request

## Roles & User Experience
 Admin

Create, update and delete products

Register stock input and output

View low stock alerts

Access full stock movement history

## User

View products

Access stock movement history

## Main Features

JWT-based authentication

Products CRUD

Stock movement registration (in / out)

Low stock visual alerts

Stock movement filtering

Secure logout

## Environment Variables

Create a .env file at the project root:

VITE_API_URL=http://localhost:4000/api

## Running the Project

Install dependencies:

npm install


Run in development mode:

npm run dev


Application available at:

http://localhost:5174


(Port may vary depending on Vite)

🔗 Related Project

This frontend is designed to work with the backend:

## inventory-backend (Node.js + MongoDB)

## Project Status

- Functional
- Backend integrated
- JWT authenticated
- Portfolio ready

## Author

Erik Eduardo Escobar Farías

Frontend project developed as professional practice using React, focused on REST API consumption, state management, authentication, and user experience.