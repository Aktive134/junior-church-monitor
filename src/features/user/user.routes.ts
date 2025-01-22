import { Router } from 'express';
import userController from './user.controller';

const {
    getAllUsers,
    getUserById
} = userController;


const userRouter = Router()

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);

export default userRouter;




