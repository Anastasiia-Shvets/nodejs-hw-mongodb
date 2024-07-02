import { createContact, getAllContacts } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req, res) => {
    try {
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);
        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
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


