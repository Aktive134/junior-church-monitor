import { Router } from 'express';
import authController from './auth.controller';
import middlewares from '../../middleware';

const {
    // sendOtp,
    // verifyOtp,
    sendInvite,
    signUpHandler,
    loginInvite,
    loginHandler
} = authController;

const { validateUser } = middlewares;



const authRouter = Router()

authRouter.post("/auth/send-invite", validateUser, sendInvite);
authRouter.post("/auth/sign-up", signUpHandler);
authRouter.post("/auth/login-invite", loginInvite);
authRouter.post("/auth/login", loginHandler);
// authRouter.post("/auth/send-otp", sendOtp);
// authRouter.post("/auth/verify-otp", verifyOtp);

export default authRouter




