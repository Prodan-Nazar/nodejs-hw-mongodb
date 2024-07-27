import { Router } from 'express';
import upload from '../middlewares/upload.js';
import {
  createContactController,
  deleteContactsController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  contactsAddShema,
  contactsUpdateShema,
} from '../validation/contactsShema.js';
import { isValidId } from '../middlewares/isValiId.js';
import authentificate from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authentificate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsAddShema),
  ctrlWrapper(createContactController),
);
contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactsUpdateShema),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactsController),
);

export default contactsRouter;
