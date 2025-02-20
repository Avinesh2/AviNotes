import express from 'express';
import { signup ,signin, signout, checkAuth} from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const app=express();
const router= express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',verifyToken,signout);
router.get('/checkAuth',checkAuth);
export default router