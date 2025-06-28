import express from "express";
import { forgotPassword, login, register } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-pass', forgotPassword);

export default router;
