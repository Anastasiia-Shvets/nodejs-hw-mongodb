import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import rootRouter from './routers/index.js';

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello!',
        });
    });
    app.use(rootRouter);
    app.use('*', notFoundHandler);
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
