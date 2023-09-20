import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/auth.controller';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/logout', logOut);

export default router;