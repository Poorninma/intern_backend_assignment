require("dotenv").config();

const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

// Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Security imports
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// Error middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// 🔌 Connect DB
connectDB();

// 🧩 Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// 🔗 Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});


// 📄 Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Backend Internship Assignment API 🚀"
    },
    servers: [
      {
        url: "http://127.0.0.1:5000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          }
        },
        Task: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }] // ✅ Swagger auth added
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

// 🌐 Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


// ⚠️ Global error handler (ONLY ONCE & LAST)
app.use(errorHandler);


// 🚀 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://127.0.0.1:${PORT}`);
});