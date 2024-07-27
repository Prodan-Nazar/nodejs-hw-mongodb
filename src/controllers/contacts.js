import createHttpError from 'http-errors';
import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contactServices.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/parseFavouriteContactFilter.js';
import { contactFieldList } from '../constants/contact-constants.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import env from '../utils/env.js';
import 'dotenv/config';

export const getAllContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const { query } = req;
    const { page, perPage } = parsePaginationParams(query);
    const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
    const filter = { ...parseContactFilterParams(query), userId };

    const data = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};

export const getContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const data = await getContactById({ _id: contactId, userId });
    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });

}

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const data = await addContact({ ...req.body, userId, photo: photoUrl, });
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const data = await updateContact({ _id: contactId, userId }, { ...req.body, photo: photoUrl, });

    if (!data) {
        next(createHttpError(404, `Contact not found`));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: data.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await deleteContact({ _id: contactId, userId });

    if (!contact) {
        next(createHttpError(404, `Contact not found`));
        return
    }
    res.status(204).send();

};
