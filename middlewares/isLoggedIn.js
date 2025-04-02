import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { userModel } from "../models/userModel.js";
import express from "express";

let isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("err", "You need to login first"); // kisi aur bhi route pe ye messgae access kar payenge
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ _id: decoded.id }) // token me mail aur id tha
      .select("-password"); // password hatne ke liye
    req.user = user; // req pe user attach kr do
    next();
  } catch (error) {
    req.flash("err", "Something went wrong.");
    return res.redirect("/");
  }
};

export { isLoggedIn };
