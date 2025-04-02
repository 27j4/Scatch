import express from "express";
const router = express.Router();
import flash from "connect-flash";
import expressSession from "express-session";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { productModel } from "../models/productModel.js";

router.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
router.use(flash());

router.get("/", (req, res) => {
  let err = req.flash("err"); /// isme bhi khali kar de rha hai message ko
  res.render("index", { err }); // error messgae likhne ke liye
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productModel.find();
  res.render("shop", { products });
});

export default router;
