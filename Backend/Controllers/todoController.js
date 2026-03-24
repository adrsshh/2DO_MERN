const Todo = require("../Models/Todo");
const mongoose = require("mongoose");

// Create Todo
const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            user: req.user,
            title: req.body.title
        });

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Todos of Logged-in User
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update existing Todos
const updateTodo = async (req, res) => {
    try {
        const id = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Todo ID" });
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        todo.title = req.body.title || todo.title;
        todo.completed = req.body.completed ?? todo.completed;

        const updatedTodo = await todo.save();

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Todos
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id.trim();
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Todo ID" });
        }
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await todo.deleteOne();

        res.json({ message: "Todo removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTodo, getTodos , updateTodo, deleteTodo };