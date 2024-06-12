import { createContact, getAllContacts } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 'success',
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully creates a contact!',
        data: contact,
    });
};


