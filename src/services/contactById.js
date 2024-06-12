import { ContactsCollection } from "../model/contacts.js";

export const getOneContact = async (contactId) => {
    try {
        const contact = await ContactsCollection.findById(contactId);
        return contact;
    } catch (error) {
        throw new Error('Not found.', error);
    }
};
