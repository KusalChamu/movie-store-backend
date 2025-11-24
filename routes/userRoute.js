import express from 'express';
import { createUser, loginUser } from '../controllers/userController';

const userRouter = express.Router()

userRouter.post('/',createUser)
userRouter.post('/',loginUser)

export default userRouter