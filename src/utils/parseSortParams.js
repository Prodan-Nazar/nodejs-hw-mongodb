import { sortOrderList } from "../constants/contacts-constants.js";

const parseSortParams = ({ sortOrder, sortBy }, contactFieldList) => {
    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : '_id';

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};

export default parseSortParams;
