const express = require("express");

const {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");
const { protectRoutes } = require("../middleware/authMiddleware");
const todoRouter = express.Router();

todoRouter.get("/", protectRoutes, getTodos);
todoRouter.post("/", protectRoutes, setTodo);
todoRouter.put("/:id", protectRoutes, updateTodo);
todoRouter.delete("/:id", protectRoutes, deleteTodo);

module.exports = todoRouter;
