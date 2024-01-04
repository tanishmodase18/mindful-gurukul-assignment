const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    }
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;