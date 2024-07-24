import { addContact, deleteContact, getOneContact, getContacts, updateContact } from '../services/contact-services.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { contactFieldList } from '../constants/contacts-constants.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';
import env from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, contactFieldList);
    const filter = { ...parseContactsFilterParams(req.query), userId };

    const contacts = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter
    });

        res.status(200).json({
            status: res.statusCode,
            message: "Successfully found contacts!",
            data: contacts
        });
};

export const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId} = req.params;
    const contact = await getOneContact({_id:contactId, userId});

        if (!contact) {
            throw createHttpError(404, `Contact with id ${contactId} not found`);
        }
        res.status(200).json({
            status: res.statusCode,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact
        });
};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    let photo = '';

    if (req.file) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
        photo = await saveFileToCloudinary(req.file, 'photo');
        } else {
        photo = await saveFileToUploadDir(req.file, 'photo');
        }
    };
    const contact = await addContact({
        ...req.body,
        userId,
        photo,
    });
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact
    });
};

export const patchContactController = async(req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    let photo = '';

    if (req.file) {
        if (env("ENABLE_CLOUDINARY") === "true") {
            photo = await saveFileToCloudinary(req.file, 'photo');
        } else {
            photo = await saveFileToUploadDir(req.file, 'photo');
        }
    }

    const contact = await updateContact({ _id: contactId, userId }, {
        ...req.body,
        photo,
    });
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: contact
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await deleteContact({_id: contactId, userId});
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).json();
};
