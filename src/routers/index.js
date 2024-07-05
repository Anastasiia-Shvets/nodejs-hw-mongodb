import { Router } from "express";
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const rootRouter = Router();

rootRouter.use('/contucts', contactsRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
