/*ContactRouter.js: defines routes and validation conditions according to the project specification*/

//initializing and calling modules
const router = require("express").Router();
const { validateContact, Contact } = require("../models/Contact.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { auth } = require("../middlewares/auth");

//defining routes
// create contact.
router.post("/contact", auth, async (req, res) => {
    const { error } = validateContact(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, email, phone } = req.body;
    try {
        const newContact = await Contact.create({
        name,
        address,
        email,
        phone,
        postedBy: req.user._id,
        });
        res.status(201).json(newContact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    });

    // read contacts
    router.get("/allcontacts", auth, async (req, res) => {
    try {
        const allcontacts = await Contact.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "-password"
        );

        return res.status(200).json(allcontacts.reverse());
    } catch (err) {
        console.log(err);
    }
});

// single contact.
router.get("/contact/:id", auth, async (req, res) => {
    const { id } = req.params;
    
    if (!id) return res.status(400).json({ error: "id not found!" });
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "id not valid!" });
    
    try {
        const contact = await Contact.findById(id);
        return res.status(200).json(contact);
    } catch (err) {
        console.log(err);
    }
    });
    

// update contact.
router.put("/edit/:id", auth, async (req, res) => {
const { id } = req.params;

try {
    const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { ...req.body },
    {
        new: true,
    }
    );
    res.status(200).json(updatedContact);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// delete a contact.
router.delete("/delete/:id", auth, async (req, res) => {
const { id } = req.params;

if (!id) return res.status(400).json({ error: "id not found!" });

if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "id not valid!" });
try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) return res.status(400).json({ error: "Contact not found!" });

    if (req.user._id.toString() !== contact.postedBy._id.toString())
        return res.status(401).json({ error: "Not authorized to remove contact!" });

    const result = await Contact.deleteOne({ _id: id });
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "-password"
    );

    return res.status(200).json({ result, myContacts });
} catch (err) {
    console.log(err);
}
});

// delete all contacts
router.delete("/delete_all", auth, async (req, res) => {
    try { 
        const deletedContacts = await Contact.deleteMany({ postedBy: req.user._id });
        return res.status(200).json(deletedContacts);
    } catch (err) {
            console.log(err);
    }
});


module.exports = router;