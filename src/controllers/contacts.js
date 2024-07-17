import { createContact, getAllContacts } from "../services/contacts.js";
import checkEnvFor from "../utils/env.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);
        const contacts = await getAllContacts(req.user._id, {
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
            userId,
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
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (checkEnvFor('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const newContact = await createContact({
        ...req.body,
        photo: photoUrl,
        userId: req.user._id,
    });

    res.status(201).json({
        status: res.statusCode,
        message: 'Successfully created a contact!',
        data: newContact,
    });
};
