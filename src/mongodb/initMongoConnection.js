import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { MONGO_VARS } from '../contacts/index.js';

export const initMongoConnection = async() => {
    try {
        const user = env(MONGO_VARS.MONGODB_USER);
        const password = env(MONGO_VARS.MONGODB_PASSWORD);
        const url = env(MONGO_VARS.MONGODB_URL);
        const db = env(MONGO_VARS.MONGODB_DB, '');
        await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster`);
        console.log('Mongo connection successfully established!');

    } catch (error) {
        console.log('Error while setting up mongo connection', error);
        process.exit(1);
    }
};
