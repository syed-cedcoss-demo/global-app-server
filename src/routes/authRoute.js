import express from "express";
import { getUser, signup, verify } from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify", verify);
router.get("/getUser", userAuth, getUser);

export default router;
