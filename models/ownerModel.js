import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
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
  product: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId, // ek id type set krne ke liye
        ref: "product",
      },
    ],
  },
  gstin: {
    type: String,
  },
  picture: {
    type: String,
    default: "newUser.png",
  },
});

export const owner = mongoose.model("owner", ownerSchema);
