import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

export { generateToken };
