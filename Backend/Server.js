const path = require("path");
const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const todoRoutes = require("./Routes/todoRoutes");
const authRoutes = require("./Routes/authRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "https://2dobyjeet.netlify.app",
];

const allowedOrigins = (
    process.env.CORS_ORIGINS ||
    process.env.CLIENT_URLS ||
    process.env.CLIENT_URL ||
    defaultAllowedOrigins.join(",")
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
    })
);
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`The Server is Running at ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
