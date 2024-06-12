import { Router } from 'express';
import { getContactByIdController, getContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));


export default router;
