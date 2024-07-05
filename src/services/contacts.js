import { SORT_ORDER } from "../contacts/index.js";
import { ContactsCollection } from "../model/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
}) => {
    try {
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const contactsQuery = ContactsCollection.find();
        const contactsCount = await ContactsCollection.find()
            .merge(contactsQuery)
            .countDocuments();
        const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
        const paginationData = calculatePaginationData(contactsCount, perPage, page);
        return {
            data: contacts,
            ...paginationData,
        };
    } catch (error) {
        throw new Error('Not found.', error);
    }
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};


