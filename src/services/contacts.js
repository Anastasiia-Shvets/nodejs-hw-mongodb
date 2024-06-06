import { ContactsCollection } from '../db/contacts.js';


export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getOneContact = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};
