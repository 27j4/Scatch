import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
    required: true,
  },
  panelColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});
const product = mongoose.model("product", productSchema);
export { product };
