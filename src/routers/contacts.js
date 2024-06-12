import { Router } from "express";
import { createContactController, getContactsController } from '../controllers/contacts.js';
import { deleteContactController, getContactByIdController, patchContactController } from '../controllers/contactById.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contact/:contactId', ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));


export default router;
