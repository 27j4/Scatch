import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import upload from "../config/multerconfig.js";
import { productModel } from "../models/productModel.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { image, name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelColor: panelcolor,
      textColor: textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    req.flash("success", "Product Not  created successfully");
    res.redirect("/owners/admin");
  }
});

export default router;
