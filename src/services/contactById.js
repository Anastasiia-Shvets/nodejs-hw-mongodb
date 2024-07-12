import { ContactsCollection } from '../model/contacts.js';

export const getOneContact = async (contactId, userId) => {
  try {
    const contact = await ContactsCollection.findById({
      _id: contactId,
      userId,
    });
    return contact;
  } catch (error) {
    throw new Error('Not found.', error);
  }
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
