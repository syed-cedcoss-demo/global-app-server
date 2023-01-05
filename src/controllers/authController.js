import chalk from "chalk";
import userModel from "../models/userModel.js";
import { registrationMail } from "../services/email.js";
import { hashPassword, verifyPassword } from "../services/hash.js";
import { signJWT, verifyJWT } from "../services/jwt.js";

export const signup = async (req, res) => {
  try {
    let payload = req.body;
    const isUser = await userModel.find({
      $or: [{ email: { $eq: payload?.email } }, { username: { $eq: payload?.username } }],
    });
    if (isUser?.length <= 0) {
      const hashPass = await hashPassword(payload.password);
      payload = { ...payload, password: hashPass };
      const user = await userModel.create(payload);
      const token = await signJWT({ id: user?._id });
      await registrationMail({
        username: user?.username,
        url: `${process.env.SERVER_URL}/api/auth/verify?token=${token}`, // verification url
      });
      res
        .status(200)
        .send({ success: true, msg: "user successfuly registered, kidly check your mail" });
    } else {
      res.status(200).send({ success: true, msg: "user alrady exist" });
    }
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(200).send(error?.message);
  }
};

export const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const isValid = await verifyJWT(token);
    if (isValid?.id) {
      const isActive = await userModel.updateOne(
        { _id: isValid?.id },
        { $set: { isActive: true } }
      );
      if (isActive?.modifiedCount > 0) {
        res.status(200).send("Your account verified successful, login to continue");
      }
    }
  } catch (error) {
    res.status(200).send("Something went wrong");
  }
};

export const getUser = async (req, res) => {
  try {
    console.log("req.ip", req.ip);
    const user = await userModel.find({});
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
    res.status(200).send(error?.message);
  }
};
