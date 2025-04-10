// export DEBUG=development:* -> This line is important for debugging we run it on terminal
// export NODE_ENV=development
// export NODE_ENV=production

import mongoose from "mongoose";
import debug from "debug";
import config from "config";

const dbgr = debug("development:mongoose"); // The main thing is that we dont want that everything will be printed

export const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("MONGODB_URI")}/Scatch`);
    dbgr("MongoDB connected successfully!"); // The main thing is that we dont want that everything will be printed
  } catch (error) {
    dbgr("MongoDB connection error:", err);
  }
};

