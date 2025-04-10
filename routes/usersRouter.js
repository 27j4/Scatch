import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import session from "express-session";
import flash from "connect-flash";

const router = express.Router();
router.use(cookieParser());

router.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
router.use(flash());

router.get("/", (req, res) => {
  res.send("panda again");
});

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logoutUser);
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user.id }).populate("cart");
  let allProduct = user.cart;
  console.log(allProduct);
  res.render("cart", { allProduct });
});

export default router;
