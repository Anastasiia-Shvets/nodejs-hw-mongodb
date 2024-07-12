import {
  deleteContact,
  getOneContact,
  updateContact,
} from '../services/contactById.js';
import createHttpError from 'http-errors';

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getOneContact(contactId, userId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found.'));
    return;
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await updateContact(contactId, req.body, userId);
  if (!result) {
    next(createHttpError(404, 'Contact not found.'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
