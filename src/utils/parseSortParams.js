import sortOrderList from '../constants/indexSort.js';

const parseSortParams = ({ sortBy, sortOrder }, constantsFieldList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];

  const parsedSortBy = constantsFieldList.includes(sortBy)
    ? sortBy
    : constantsFieldList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
