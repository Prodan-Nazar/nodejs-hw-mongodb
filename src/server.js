import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from "cookie-parser";
import env from './utils/env.js';
import contactsRouter from './routers/contacts-routers.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/auth-router.js';
import { UPLOAD_DIR } from './constants/index.js';


const port = env('PORT', '3000');

const setupServer = () => {

    const app = express();

    const logger = pino({
        transport: {
            target: 'pino-pretty',
        },
    });

    app.use(logger);
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/auth', authRouter);
    app.use('/contacts', contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
