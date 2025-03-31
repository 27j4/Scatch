import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // start aur end se white spaces hata deta hai
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId, // ek id type set krne ke liye
        ref: "product",
      },
    ],
  },
  isAdmin: {
    type: Boolean,
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "newUser.png",
  },
});

export const user = mongoose.model("user", userSchema);
