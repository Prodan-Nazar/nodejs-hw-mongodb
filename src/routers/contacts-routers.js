import express from 'express';
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from '../controllers/contacts-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import { contactAddSchema, contactPatchSchema } from '../validation/contacts-validation.js';
import validateBody from '../utils/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', isValidId, upload.single('photo'), validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));


export default contactsRouter;
