const Contact =require('../models/Contact');
const asyncHandler = require('express-async-handler');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async(req, res) => {
    //res.status(201).json({message: "Create new Contact"});
    //try{
        const {name, email, phone, designation} = req.body;
        if(!name || !email || !phone || !designation){
            res.status(400);
            throw new Error("All fields are required");
        }
        const contact = await Contact.create({
            name, email, phone, designation
        });
        res.status(201).json({contact});
    }); // catch {
        //res.status(500).json({error:error.message});
    //}
//})

const getContact = asyncHandler (async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error ("Contact not found");
    }
    res.status(200).json({contact});
});

// Update
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const UpdateContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, // Permite modificar el cuerpo o datos
        {  new: true,}
    );
    res.status(200).json(updateContact); //Se usó para reflejar que la accion se ejecuto correctamente
})

//  delete
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({
        message:`Delete Contact for ${req.params.id}`
    })
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact}