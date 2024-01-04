const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");

    if (!token) {
        next({status:401, message:"Unauthorized HTTP, Token not provided"});
    }

    jwtToken = token.replace("Bearer", "").trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWTSECRETKEY);

        const userData = await User.findOne({email:isVerified.email}).select({password:0});

        req.user = userData;
        req.token = jwtToken;
        req.userID = userData._id;
        next();
    } catch (error) {
        next({status:401, message:error});
    }
};

module.exports = authMiddleware;