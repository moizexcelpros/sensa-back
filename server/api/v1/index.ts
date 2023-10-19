import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import rolesRouter from "./roles";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/roles', rolesRouter);

export default router;
