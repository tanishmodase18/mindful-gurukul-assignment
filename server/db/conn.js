const mongoose = require("mongoose");

const url = process.env.DATABASE;

const connectDb = async () => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        next({status:502, message: error});
        process.exit(0);
    }
}

module.exports = connectDb;