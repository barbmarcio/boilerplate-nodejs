import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticationController from '../controller/authentication.controller';

const authRouter = Router();
const authController = container.resolve(AuthenticationController);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password/:resetToken', authController.resetPassword);

export default authRouter;
