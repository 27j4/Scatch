import express from "express";
const router = express.Router();
import flash from "connect-flash";
import expressSession from "express-session";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { productModel } from "../models/productModel.js";
import { userModel } from "../models/userModel.js";

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
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user.id });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Product is added to cart");
  res.redirect("/shop");
});



export default router;
