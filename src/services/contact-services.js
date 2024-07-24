import Contact from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getContacts = async ({ filter, page, perPage, sortBy = '_id', sortOrder }) => {
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find();

    if (filter.userId) {
        contactsQuery.where("userId").equals(filter.userId);
    };
    if (filter.type) {
        contactsQuery.where("type").equals(filter.type);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const data = await contactsQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await Contact.find().merge(contactsQuery).countDocuments();

    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({ total: totalItems, perPage, page });

    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage
    };
};

export const getOneContact = async(filter) => {
    const contact = await Contact.findOne(filter);
    return contact;
};

export const addContact = data => Contact.create(data);

export const updateContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        includeResultMetadata: true,
        ...options,
    });

    if (!result || !result.value) return null;

    const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;

    return {
        data: result.value,
        isNew,
    };
};

export const deleteContact = async(contactId) => {
    const contact = await Contact.findOneAndDelete(contactId);
    return contact;
};
