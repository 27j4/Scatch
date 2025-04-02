import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generateToken } from "../utils/generateTokens.js";
import { productModel } from "../models/productModel.js";

let createUser = async (req, res) => {
  try {
    let { email, password, name, address, contact } = req.body; // Joy se hum restrictions laga skte hai [ki inme se kuch field nhi hui to user nhi banane dega ]
    // encryption , jwt , bcrypt , cookie
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("err", "Again creating");
      res.redirect("/");
      return;
    }

    let findUser = await userModel.create({
      email,
      password: hash,
      name,
      address,
      contact,
    });

    let token = generateToken(findUser);
    res.cookie("token", token);
    res.send(findUser);
  } catch (error) {
    res.send(error);
  }
};

let loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      req.flash("err", "Jaldi vahan se niklo (Tum ho hi nhi)");
      return res.redirect("/");
    }

    let result = await bcrypt.compare(password, user.password);

    if (result) {
      let products = await productModel.find();
      let token = generateToken(user);
      res.cookie("token", token);
      return res.render("shop", { products });
    } else {
      req.flash("err", "Jaldi password");
      // console.log(req.flash("err")); // ye bakchodi hai , re initialise ho ja rha hai "" - empty string se
      return res.redirect("/");
    }
  } catch (error) {
    res.send(error);
  }
};

let logoutUser = async (req, res) => {
  try {
    res.cookie("token", ""); // Bhai res.cookie() hota hai
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
};

export { createUser, loginUser, logoutUser };

// let loginUser = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     const user = await userModel.findOne({ email: email });

//     if (!user) {
//       req.flash("err", "Jaldi vahan se niklo (Tum ho hi nhi)");
//       return res.redirect("/");

//     }

//     // Use await without callback
//     let result = await bcrypt.compare(password, user.password);

//     if (result) {
//       let products = await productModel.find();
//       let token = generateToken(user);
//       res.cookie("token", token);
//       res.render("shop", { products });
//     } else {
//       req.flash("err", "Jaldi password");
//       // console.log(req.flash("err"));
//       res.redirect("/");
//     }
//   } catch (error) {
//     res.send(error);
//   }
// };
