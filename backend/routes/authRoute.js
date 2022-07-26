const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController");
const { protectRoutes } = require("../middleware/authMiddleware");

authRouter.post("/", authController.registration);
authRouter.post("/login", authController.login);
authRouter.get("/user", protectRoutes, authController.getUsers);

module.exports = authRouter;
