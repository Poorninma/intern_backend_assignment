# 🚀 Backend Intern Assignment

## 📌 Features

* 🔐 User Authentication using JWT & bcrypt
* 👑 Role-Based Access Control (Admin/User)
* 📝 Task Management (Full CRUD APIs)
* ✅ Input Validation & Centralized Error Handling
* 📄 API Documentation using Swagger
* 🔒 Security with Helmet & JWT
* 🌐 Basic Frontend (Vanilla JS)

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Frontend:** HTML, CSS, JavaScript

---

## ▶️ Run Backend

```bash
cd backend
npm install
npx nodemon server.js
```

---

## 🌐 Run Frontend

Open the file in your browser:

```bash
frontend/register.html
```

---

## 🔐 API Endpoints

### 🔑 Authentication

* `POST /api/v1/auth/register` → Register user
* `POST /api/v1/auth/login` → Login user

### 📝 Tasks

* `GET /api/v1/tasks` → Get all tasks
* `POST /api/v1/tasks` → Create task
* `PUT /api/v1/tasks/:id` → Update task
* `DELETE /api/v1/tasks/:id` → Delete task (Admin only)

---

## 🔑 Authorization

Use Bearer Token in headers:

```
Authorization: Bearer <your_token>
```

---

## 📄 API Documentation

Swagger UI available at:

```
http://127.0.0.1:5000/api-docs
```

---

## 🚀 Deployment

* Backend can be deployed on Render / Railway / AWS
* Environment variables used for configuration

---

## 📈 Scalability Notes

* Modular architecture (controllers, routes, middleware)
* Can be extended into microservices (Auth Service, Task Service)
* Redis caching can improve performance
* Load balancing using Nginx
* Docker support for containerized deployment
* Horizontal scaling in cloud environments (AWS/Azure)

---

## 👩‍💻 Author

**Poornima Shigli**
