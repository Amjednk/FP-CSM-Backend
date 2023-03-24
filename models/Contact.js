/*Contact model schema*/

//initializing and calling modules
const mongoose = require("mongoose");
const Joi = require("joi");

//ContactSchema with name, address, email as string and phone as number as required inputs and gets the posting user
const ContactSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, "name is required."],
},
address: {
    type: String,
    required: [true, "address is required."],
},
email: {
    type: String,
    required: [true, "email is required."],
},
phone: {
    type: Number,
    required: [true, "phone number is required."],
},
postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
});

const Contact = new mongoose.model("Contact", ContactSchema);

//validate data of the contact
const validateContact = (data) => {
const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(3).max(300).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(6).max(100000000000).required(),
});

return schema.validate(data);
};

module.exports = {validateContact,Contact};
