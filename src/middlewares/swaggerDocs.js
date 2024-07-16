import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import { SWAGGER_PATH } from '../contacts/index.js';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
    try {
        const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
        return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
    } catch (err) {
        return (req, res, next) =>
            next(createHttpError(500, "Can't load swagger docs"));
    }
};
