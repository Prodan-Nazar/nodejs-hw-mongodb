// src/middlewares/notFoundHandler.js
import createHttpError from 'http-errors';

const notFoundHandler = (req, res, next) => {
    next(createHttpError(404, 'Not found'));
};

export default notFoundHandler;
