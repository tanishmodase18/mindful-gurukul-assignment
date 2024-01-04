const Customer = require("../models/customer-model");

const getAllUsers = async (req, res) => {
    try {
        const order = req.params.order;
        if (order=="Last Modified") {
            var response = await Customer.find({}).sort({ lastModified: 1 });;
        }
        else if (order=="Last Inserted") {
            var response = await Customer.find({}).sort({ insertedTimestamp: 1 });;
        }
        else {
            var response = await Customer.find({});
        }
        if (!response || response.length === 0) {
            res.status(404).json({ message: "No User Found" });
            return;
        }
        
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Customer.deleteOne({_id:id});

        return res.status(200).json({response});
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Customer.findOne({_id:id});

        return res.status(200).json({response});
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await Customer.updateOne({_id:id}, {$set: data});

        return res.status(200).json({response});
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const addUser = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await Customer.findOne({ email: data.email });

        if (userExist) {
            return res.status(401).json({ message: "Email Already Exists" });
        }

        const userCreated = await Customer.create(data);
        return res.status(200).json({ message: "User Created", userId: userCreated._id.toString()});
    } catch (error) {
        return res.status(500).json({message:error});
    }
};

module.exports = { getAllUsers, deleteUserById, getUserById, updateUserById, addUser };