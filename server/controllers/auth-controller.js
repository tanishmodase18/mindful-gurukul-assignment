const User = require("../models/user-model");

const home = async (req, res) => {
    try {
        return res.status(200).send("Welcome to home");
    } catch (error) {
        next({ message: error });
    }
};

const register = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await User.findOne({ email: data.email });

        if (userExist) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const userCreated = await User.create(data);
        return res.status(200).json({ message: "User Created", userId: userCreated._id.toString(), token: await userCreated.generateToken() });
    } catch (error) {
        next({ status: 500, message: error });
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await User.findOne({ email: data.email });

        if (!userExist) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const user = await userExist.comparePass(data.password);

        if (user) {
            return res.status(200).json({ msg: "Login Successful", userId: userExist._id.toString(), token: await userExist.generateToken() });
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        next({ status: 500, message: error });
    }
};

const user = async (req, res) => {
    try {
        const userData = req.user;

        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { home, register, login, user };