// import { SessionsCollection } from '../db/Session.js';
// import { randomBytes } from 'crypto';
// // import bcrypt from 'bcrypt';
// // import createHttpError from 'http-errors';
// import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/indexSort.js';

// export const createSession = async (userId) => {
//   await SessionsCollection.deleteOne({ userId });

//   const accessToken = randomBytes(30).toString('base64');
//   const refreshToken = randomBytes(30).toString('base64');
//   const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
//   const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

//   return SessionsCollection.create({
//     userId,
//     accessToken,
//     refreshToken,
//     accessTokenValidUntil,
//     refreshTokenValidUntil,
//   });
// };
