import { Router } from "express";
import { createContactController, getContactsController } from '../controllers/contacts.js';
import { deleteContactController, getContactByIdController, patchContactController } from '../controllers/contactById.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from '../utils/validateBody.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));


export default router;
