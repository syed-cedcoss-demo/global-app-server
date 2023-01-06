import chalk from "chalk";
import { verifyJWT } from "../services/jwt.js";
export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")?.[1];
    const isValid = await verifyJWT(token);
    console.log("token", isValid);
    if (isValid?.id) {
      next();
    } else {
      res.status(402).send({ success: false, msg: "token verification error" });
    }
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(402).send({ success: false, msg: "token verification error" });
  }
};
