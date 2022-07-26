const Todo = require("../models/Todos");
const User = require("../models/User");

const getTodos = async (req, res) => {
    try {
        const fetchTodo = await Todo.find({ user: req.user.id });
        res.status(200).json(fetchTodo);
    } catch (error) {
        console.log(error);
    }
};

const setTodo = async (req, res) => {
    try {
        if (!req.body.text) {
            res.status(400).json({ message: "Please add a text" });
        }
        const createTodo = new Todo({
            text: req.body.text,
            user: req.user.id
        });
        await createTodo.save();
        res.status(200).json(createTodo);
    } catch (error) {
        console.log(error);
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(400);
            throw new Error("Todo not found");
        }

        const user = await User.findById(req.user.id);
        // Check existing user
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        // Checked the logged in user matches the todo user
        if (todo.user.toString() !== user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log(error);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(400);
            throw new Error("todo not found");
        }
        const user = await User.findById(req.user.id);
        // Check for user
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        // Make sure the logged in user matches the todo user
        if (todo.user.toString() !== user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        // Check for user
        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }

        // Make sure the logged in user matches the todo user
        if (todo.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        await todo.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
};
