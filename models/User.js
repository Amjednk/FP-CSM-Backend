/*User model schema*/

//initializing and calling modules
const mongoose = require("mongoose");

//UserSchema with name, email and password as string and required inputs
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    email: {
        type: String,
        required: [true, "A valid email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password required."],
    },
    role: {
        type: String,
        dr: ["user", "admin"],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
});

//creating and exporting model
const User = new mongoose.model("User", UserSchema);
module.exports = User;