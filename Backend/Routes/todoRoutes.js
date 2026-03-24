const express = require("express");
const router = express.Router();
const { createTodo, getTodos, updateTodo,deleteTodo} = require("../Controllers/todoController");
const protect = require("../Middlewares/authMiddleware");

router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodo);
router.delete("/:id" , protect, deleteTodo);

module.exports = router;