const path = require("path");
const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const todoRoutes = require("./Routes/todoRoutes");
const authRoutes = require("./Routes/authRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(cors());
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
            console.log(`The Server is Running at : http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
