import * as yup from "yup";

export const userSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(2).max(30).required(),
    lastName: yup.string().min(2).max(30).required(),
    email: yup.string().email().required(),
    username: yup.string().min(4).max(10).required(),
    password: yup.string().min(4).max(8).required(),
  }),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (err) {
    return res.status(500).send({ success: false, msg: err.message });
  }
};
