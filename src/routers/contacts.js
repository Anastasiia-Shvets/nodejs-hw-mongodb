import { Router } from "express";
import { createContactController, getContactsController } from '../controllers/contacts.js';
import { deleteContactController, getContactByIdController, patchContactController } from '../controllers/contactById.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from "../utils/isValidId.js";

const contactsRouter = Router();

contactsRouter.use('/:contactId', isValidId);
contactsRouter.get('', ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post('', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));


export default contactsRouter;
