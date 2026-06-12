import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

const authRouter = Router();
authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema, { avortEarly: false }),
  registerUser,
);
authRouter.post(
  '/auth/login',
  celebrate(loginUserSchema, { avortEarly: false }),
  loginUser,
);
authRouter.post('/auth/refresh', refreshUserSession);
authRouter.post("/auth/logout", logoutUser);

export default authRouter;
