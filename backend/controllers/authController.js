const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class authController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;

            if (!email && !password) {
                return res
                    .status(400)
                    .json({ message: "Please add all fields" });
            }

            const isUsed = await User.findOne({ email });

            if (isUsed) {
                return res.status(400).json({ message: "User already exist" });
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({ email, password: hashPassword });

            await user.save();

            res.status(201).json({
                _id: user.id,
                email: user.email,
                password: user.password,
                token: generateToken(user._id)
            });
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "invalid email" });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res
                    .status(400)
                    .json({ message: "Password is not correct" });
            }
            if (user && validPassword) {
                res.status(201).json({
                    _id: user.id,
                    email: user.email,
                    password: user.password,
                    token: generateToken(user._id)
                });
            }
        } catch (error) {
            res.status(400).json({ message: "invalid credentials" });
        }
    }
    async getUsers(req, res) {
        try {
            const { _id, email, password } = await User.findById(req.user.id);
            res.status(201).json({
                id: _id,
                email,
                password
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24H" });
};

module.exports = new authController();
