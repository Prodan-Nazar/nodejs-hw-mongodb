import { contactType } from "../constants/contacts-constants.js";

const parseBoolean = (value) => {
    if (typeof value !== "string")
        return undefined;
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }
        return undefined;
};

const parseContactsFilterParams = ({ type, isFavourite }) => {
    const parsedType = contactType.includes(type) ? type : null;
    const parsedIsFavorite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavorite,
    };
};

export default parseContactsFilterParams;
