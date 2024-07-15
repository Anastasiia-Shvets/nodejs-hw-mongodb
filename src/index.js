import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import 'dotenv/config';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './contacts/index.js';

const startServer = async () => {

        await initMongoConnection();
        setupServer();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
};
startServer();

