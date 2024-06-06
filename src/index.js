import { initMongoConnection } from './mongodb/initMongoConnection.js';
import { setupServer } from './server.js';
import 'dotenv/config';

const startServer = async () => {
    try {
        console.log('successful startServer');
        await initMongoConnection();
        setupServer();
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
