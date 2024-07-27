import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { constantsFieldList } from '../constants/contact-constants.js';
import parseContactFilterParams from '../utils/parseContactFilterParams.js';
import saveFileToPublicDir from '../utils/saveFileToPublicDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, constantsFieldList);
  const filter = { ...parseContactFilterParams(req.query), userId };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById({ _id: contactId, userId });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export async function createContactController(req, res) {
  const { _id: userId } = req.user;
  let photo = '';
  // if (req.file) {
  //   photo = await saveFileToPublicDir(req.file, 'photo');
  // }
  if (req.file) {
    photo = await saveFileToCloudinary(req.file, 'photo');
  }
  const contact = await createContact({ ...req.body, userId, photo });
  res.status(201).json({
    status: 201,
    message: 'Succesfully created a contact',
    data: contact,
  });
}

export async function updateContactController(req, res, next) {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToPublicDir(photo);
  }

  const userId = req.user._id;
  const contact = await updateContact(
    { _id: contactId, userId },
    req.body,
    photoUrl,
  );

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Succesfully patched a contact',
    data: contact.data,
  });
}

export async function deleteContactsController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact({ _id: contactId, userId });
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(204).send();
}
