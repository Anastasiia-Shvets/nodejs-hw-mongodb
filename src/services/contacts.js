import { SORT_ORDER } from "../contacts/index.js";
import { ContactsCollection } from "../model/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


export const getAllContacts = async ({

    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    userId,
    filter = {},
}) => {
    try {
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const contactsQuery = ContactsCollection.find();

        if (filter.contactType) {
            contactsQuery.where('contactType').equals(filter.contactType);
        }
        if (filter.isFavourite) {
            contactsQuery.where('isFavourite').equals(filter.isFavourite);
        }

        const [contactsCount, contacts] = await Promise.all([
            ContactsCollection.find({ userId }).merge(contactsQuery).countDocuments(),
            contactsQuery
                .skip(skip)
                .limit(limit)
                .sort({ [sortBy]: sortOrder })
                .exec(),
        ]);

        const paginationData = calculatePaginationData(contactsCount, perPage, page);
        return {
            data: contacts,
            ...paginationData,
        };
    } catch (error) {
        throw new Error('Not found.', error);
    }
};

export const createContact = async ({payload, userId}) => {
    const contact = await ContactsCollection.create({...payload, perentId: userId});
    return contact;
};


