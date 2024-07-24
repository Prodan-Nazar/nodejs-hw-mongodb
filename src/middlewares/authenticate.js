import createHttpError from 'http-errors';
import { findSession } from '../services/auth.js';
import { findUser } from '../services/auth.js';

const authentificate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer') {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }
  if (!token) {
    next(createHttpError(401, 'Token missing'));
    return;
  }

  const session = await findSession({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session is not found'));
  }
  const accessTokenExparied =
    new Date() > new Date(session.accessTokenValidUntil);

  if (accessTokenExparied) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  req.user = user;
  req.session = session;

  next();
};

export default authentificate;
