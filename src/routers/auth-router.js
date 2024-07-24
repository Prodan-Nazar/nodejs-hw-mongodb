import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/user-schemas.js';
import { loginController, logoutController, refreshController, registerController, resetPasswordController, sendResetEmailController } from '../controllers/auth-controllers.js';
import { resetPasswordSchema, sendResetEmailSchema } from '../validation/auth-schemas.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/send-reset-email', validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));
authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;
