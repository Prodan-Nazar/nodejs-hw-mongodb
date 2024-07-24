import { contactTypes } from "../constants/contact-constants.js";

const parseBoolean = value => {
    if (typeof value !== "string") return;

    if (!["true", "false"].includes(value)) return;

    return value === "true";
}

const parseContactFilterParams = ({ contactType, isFavourite }) => {
    const parsedType = contactTypes.includes(contactType) ? contactType : null;
    const parsedFavourite = parseBoolean(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedFavourite,
    }
}

export default parseContactFilterParams;
