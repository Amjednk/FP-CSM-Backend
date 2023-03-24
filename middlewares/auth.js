/*auth.js is a middleware to check for required authorization to access several routes*/

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
let token;
if (!req?.headers?.authorization) {
    res.json({ message: "Not authorized!" });
}

if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded?._id).select("-password");
        req.user = user;
        next();
    }
    } catch (error) {
        res.json({ message: "Session expired or not valid!" });
    }
}
};

