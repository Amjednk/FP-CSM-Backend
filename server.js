/*app.js is the main app for the server back-end part of the contact management system project*/

//initializing and calling modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {auth} = require("./middlewares/auth");
const cors = require("cors");
// const path = require ("path");
mongoose.set("strictQuery", false);

const app = express();
dotenv.config();

//calling middlewares
app.use(express.json());

// linking back to front
app.use(cors());

//for deployment on render

app.get("/", (req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("API is running...");
})

//calling routes
app.get("/protected", auth, (req, res) => {
    res.status(200).json(req.user);
});
app.use("/api", require("./routes/UserRouter"));
app.use("/api", require("./routes/ContactRouter"));

//server connection
mongoose.connect(process.env.DBURL);

app.listen(process.env.URL, () => {
console.log(`Server is running on ${process.env.URL}`);
});
