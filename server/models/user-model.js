const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        console.log("Password Modifies");
        next();
    }

    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(this.password, salt);
        this.password = hash;
    } catch (error) {
        next({ message: error });
    }
});

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
            },
            process.env.JWTSECRETKEY,
            {
                expiresIn:"1d",
            }
        );
    } catch (error) {
        next({message: error});
    }
};

userSchema.methods.comparePass = async function (pass) {
    try {
        return bcrypt.compare(pass, this.password);
    } catch (error) {
        next({ message: error });
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;