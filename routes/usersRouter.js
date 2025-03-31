import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("panda again");
});

export default router;
