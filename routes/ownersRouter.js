// export NODE_ENV=development
// export NODE_ENV=production

// These are two types of thing we can do

import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { ownerModel } from "../models/ownerModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("panda again");
});

if (process.env.NODE_ENV == "development") {
  // this is called environment based coding
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find(); // This returns a array of all the owners
    if (owners.length > 0) {
      // 503-Service Unavailable
      res.status(503).send("You don't have permission to create a new omner"); // The number says that what type of mistake is done
      return;
    }
    let { name, email, password } = req.body;
    let owner = await ownerModel.create({
      // This is a async operation
      name,
      email,
      password,
    });
    console.log(owner);
    res.status(201).send(owner);
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

export default router;
