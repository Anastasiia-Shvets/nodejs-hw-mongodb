import { getOneContact } from "../services/contactById.js";

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await getOneContact(contactId);
        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: 'Not found',
            });
        }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
