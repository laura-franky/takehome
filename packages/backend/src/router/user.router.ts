import { registerUser, loginUser } from './../controller/user.controller';
import { Router } from 'express';

// Router responsible for relaying every Request
export const userRouter = Router({ mergeParams: true });

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
