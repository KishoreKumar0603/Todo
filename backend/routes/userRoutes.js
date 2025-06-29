import express from "express";
import { forgotPassword, getUserByEmail, login, register } from "../controllers/userController.js";
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-pass', forgotPassword);
router.get("/email/:email", getUserByEmail);

export default router;
