import { typeList } from '../constants/contact-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') {
    return;
  }

  if (!['true', 'false'].includes(value)) {
    return;
  }

  const parsedValue = value.toLowerCase() === 'true';
  return parsedValue;
};

// const parseBoolean = (value) => {
//   if (typeof value !== 'string') {
//     return null;
//   }

//   if (value === 'true') {
//     return true;
//   }

//   if (value === 'false') {
//     return false;
//   }
//   return null;
// };

const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};

export default parseContactFilterParams;
