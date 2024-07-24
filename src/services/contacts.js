import Contact from '../db/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';
import sortOrderList from '../constants/indexSort.js';
import { constantsFieldList } from '../constants/contact-constants.js';

export const getAllContacts = async ({
  filter,
  page,
  perPage,
  sortBy = constantsFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactsQuery = Contact.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== null && filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const totalContacts = await Contact.find()
    .merge(contactsQuery)
    .countDocuments()
    .exec();

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalContacts,
    perPage,
    page,
  });

  return {
    data,
    page,
    perPage,
    totalContacts,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

// export const getContactById = ({ _id, userId }) =>
//   Contact.findOne({ _id, userId });

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const getContactById = async (filter) => {
  console.log(filter);
  const contact = await Contact.findOne(filter);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    // new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    data: result.value,
    isNew,
  };
};

export const deleteContact = async ({ _id: contactId, userId }) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

// export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
// export const getContactById = (filter) => Contact.findOne(filter);
