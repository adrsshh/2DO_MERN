const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const todoRoutes = require("./Routes/todoRoutes");
const authRoutes = require("./Routes/authRoutes");
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`The Server is Running at : http://localhost:${PORT}`);
})
