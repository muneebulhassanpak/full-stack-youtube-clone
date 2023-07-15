import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new Error("Not Logged In"));
  }
  const status = jwt.verify(accessToken, process.env.JWT_KEY);
  if (!status) {
    return next(new Error("Invalid Token"));
  }
  req.user = status;
  next();
};
