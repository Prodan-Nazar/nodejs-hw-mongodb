import express from 'express';
import { getAllContactsController, getContactController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js'
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', upload.single('photo'), isValidId, ctrlWrapper(getContactController));

contactsRouter.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController))

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
