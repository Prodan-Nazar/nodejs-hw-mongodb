import express from 'express';
import { getAllContactsController, getContactController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController))

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
