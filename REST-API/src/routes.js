import { Router } from 'express';
import userController from './controllers/userController.js';
import characterController from './controllers/characterController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/characters', characterController);

export default routes;