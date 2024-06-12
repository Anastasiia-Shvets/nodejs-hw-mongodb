import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getContactsController } from './controllers/contacts.js';
import { getContactByIdController } from './controllers/contactById.js';

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
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

    app.use('/contacts', getContactsController);
    app.use('/:contactId', getContactByIdController);
    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });

    });

    const PORT = process.env.PORT || 3000;


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
