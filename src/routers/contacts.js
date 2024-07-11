import { Router } from 'express';
import {
  createContactController,
  getContactsController,
} from '../controllers/contacts.js';
import {
  deleteContactController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contactById.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../utils/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.use('/:contactId', isValidId);
router.get('', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
