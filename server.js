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

<<<<<<< HEAD
<<<<<<< HEAD
//for deployment on render
=======
>>>>>>> 2a9d7b9ba2e0db9adc27898ac5bd7b92b4bfe474
=======
>>>>>>> 2a9d7b9ba2e0db9adc27898ac5bd7b92b4bfe474
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
