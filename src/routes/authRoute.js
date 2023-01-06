import express from "express";
import { getUser, login, signup, verify } from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";
import { userSchema, validate } from "../middleware/userSchema.js";

const router = express.Router();

router.post("/signup", validate(userSchema), signup);
router.get("/verify", verify);
router.post("/login", login);
router.get("/getUser", userAuth, getUser);

export default router;
