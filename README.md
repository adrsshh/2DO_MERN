# MERN Stack ToDo App – Full Stack Project

## Overview

This is a **Full Stack ToDo Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with modern UI components using **shadcn/ui, Tailwind CSS, and React**.
The application includes **JWT Authentication, Protected Routes, User Login/Register, and Full CRUD operations for Todos**.

This project was built primarily as a **learning-by-building project** to understand backend authentication, API integration, database operations, and frontend-backend communication.

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* shadcn/ui
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv

---

## Features

### Authentication System

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Token Generation
* Protected Routes
* Logout functionality
* Logged-in user info popover (Name & Email)

### Todo Features

* Create Todo
* Delete Todo
* Update Todo (Mark Complete / Incomplete)
* Fetch User-specific Todos
* Loading state while fetching todos

### UI Features

* Minimal modern UI using shadcn components
* Hover Card (App Info)
* Popover (User Info)
* Alert Dialog (Logout Confirmation)
* Responsive layout
* Clean Dashboard layout

---

## Authentication Flow (JWT)

The authentication system works using **JWT (JSON Web Token)**.

### Flow:

1. User registers with name, email, password
2. Password is hashed using bcrypt before storing in database
3. User logs in with email and password
4. Backend verifies password
5. JWT token is generated using user ID
6. Token is sent to frontend
7. Frontend stores token in localStorage
8. Axios sends token in Authorization header for protected routes
9. Backend middleware verifies token before allowing access
10. User can access protected routes like Todos and Dashboard

---

## Backend Architecture

```
Backend
│
├── Config
│     db.js
│
├── Controllers
│     authController.js
│     todoController.js
│
├── Middlewares
│     authMiddleware.js
│
├── Models
│     User.js
│     Todo.js
│
├── Routes
│     authRoutes.js
│     todoRoutes.js
│
├── Utils
│     generateToken.js
│
├── Server.js
├── .env
└── package.json
```

### Backend Responsibilities

* User authentication
* JWT token generation
* Password hashing
* Protected routes
* Todo CRUD operations
* MongoDB database operations

---

## Frontend Architecture

```
Frontend
│
├── src
│   ├── api
│   │     axios.js
│   │
│   ├── components
│   │     Navbar.jsx
│   │     TodoForm.jsx
│   │     TodoItem.jsx
│   │
│   ├── pages
│   │     Login.jsx
│   │     Register.jsx
│   │     Dashboard.jsx
│   │
│   ├── utils
│   │     ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

### Frontend Responsibilities

* Login/Register UI
* Dashboard UI
* API calls using Axios
* Store JWT token
* Protected routing
* Display Todos
* User popover info

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | /api/auth/register | Register new user       |
| POST   | /api/auth/login    | Login user              |
| GET    | /api/auth/me       | Get logged-in user info |

### Todos

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/todos     | Get all todos |
| POST   | /api/todos     | Create todo   |
| PUT    | /api/todos/:id | Update todo   |
| DELETE | /api/todos/:id | Delete todo   |

---

## Concepts Used in This Project

This project covers many important full stack development concepts:

### Backend Concepts

* REST API Design
* MVC Architecture
* MongoDB Database Design
* Mongoose Models
* Authentication vs Authorization
* JWT Token Authentication
* Password Hashing (bcrypt)
* Environment Variables (.env)
* Middleware in Express
* Protected Routes
* CRUD Operations

### Frontend Concepts

* React Components
* React Hooks (useState, useEffect)
* React Router
* Axios API Calls
* LocalStorage Token Storage
* Protected Routes
* Conditional Rendering
* Component-based UI
* Tailwind CSS Styling
* shadcn UI Components
* Popover / Dialog / Hover Card UI

---

## Full Application Flow

```
Register → Login → JWT Token Generated → Token Stored → Dashboard Access
        ↓
Axios sends token in headers
        ↓
Backend middleware verifies token
        ↓
User-specific Todos fetched from MongoDB
        ↓
User can Create / Delete / Update Todos
```

---

## Installation & Setup

### Clone Repository

```
git clone https://github.com/adrsshh/2DO_MERN.git
```

### Backend Setup

```
cd Backend
npm install
npm run dev
```

### Frontend Setup

```
cd Frontend
npm install
npm run dev
```

---

## Environment Variables (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Future Improvements

* Edit Todo dialog
* Todo filters (All / Completed / Pending)
* Search Todos
* Dark Mode
* Due Date
* Priority Levels
* Deploy on Render / Vercel
* Add Docker
* Add Refresh Tokens
* Add Email Verification

---

## Learning Outcome

By building this project, the following concepts were learned and implemented:

* Full Stack MERN Development
* Authentication using JWT
* Password Hashing
* Protected Routes
* REST API Development
* MongoDB Database Integration
* React Frontend Development
* API Integration using Axios
* Modern UI using shadcn and Tailwind
* Full Stack Project Structure
* Deployment Ready Architecture

---

## Conclusion

This project is a **complete full stack MERN application** that demonstrates authentication, authorization, CRUD operations, frontend-backend integration, and modern UI development.
It serves as a strong foundation for building more advanced full stack applications like blog platforms, chat applications, SaaS dashboards, etc.
