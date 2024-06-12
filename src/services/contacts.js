import { ContactsCollection } from "../model/contacts.js";


export const getAllContacts = async () => {
    try {
        const contacts = await ContactsCollection.find();
        return contacts;
    } catch (error) {
        throw new Error('Not found.', error);
    }
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};


