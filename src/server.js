import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getOneContact } from './services/contacts.js';

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

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({ data: contacts });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getOneContact(contactId);
            res.status(200).json({ data: contact });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // app.get('contacts', getAllContacts);
    // app.get('/contacts/:contactId', getOneContact);

    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};
