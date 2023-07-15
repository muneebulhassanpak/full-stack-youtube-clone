import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Sign up
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return next(new Error("Missing required fields"));
  }

  try {
    const ifExists = await User.findOne({ email: email }).exec();
    if (ifExists) {
      return next(new Error("User with same email already exists"));
    } else {
      try {
        const hash = await bcrypt.hash(password.toString(), 10);
        const user = new User({ name, email, password: hash });
        const response = await user.save();
        const result = {
          message: "Successfully Signed Up",
          status: 200,
        };

        return res.json(result);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//Sign in
export const signin = async (req, res, next) => {
  const { email, userpassword } = req.body;
  console.log(req.body);
  if (!email || !userpassword) {
    return next(new Error("Missing credentials"));
  }
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return next(new Error("Incorrect login credentials"));
    }
    const passwordComparison = await bcrypt.compare(
      userpassword,
      user.password
    );
    if (!passwordComparison) {
      return next(new Error("Incorrect login credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    console.log(token);
    res
      .header("Access-Control-Allow-Credentials", "true")
      .cookie("access_token", token, {
        sameSite: "none",
        httpOnly: true,
      });

    return res.status(200).json({
      status: 200,
      message: "Successfully Logged in",
      user: user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};
