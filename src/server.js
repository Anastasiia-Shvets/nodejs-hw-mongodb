import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getOneContact } from './services/contacts.js';
import mongoose from 'mongoose';

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
            res.status(500).json({ message: 'Internal server error', error });
        }
    });

    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return res.status(400).json({
                    data: 'ID is not valid.',
                });
            }
            const contact = await getOneContact(contactId);
            res.status(200).json({ data: contact });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    });

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
