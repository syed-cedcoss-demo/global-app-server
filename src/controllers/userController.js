import chalk from "chalk";
import userModel from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).send({ success: true, data: data, msg: "success" });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};
