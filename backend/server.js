const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const todoRouter = require("./routes/todosRoute");
const authRouter = require("./routes/authRoute");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/api/users", authRouter);
app.use("/api/todos", todoRouter);
app.use(errorHandler);
// app.use(express.static(__dirname));

const start = async () => {
    try {
        connectDB();
        app.listen(PORT, () => console.log(`${PORT}`));
    } catch (error) {
        console.log(error);
    }
};
start();
