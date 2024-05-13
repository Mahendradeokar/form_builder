import mongoose from "mongoose";

export const mongooseConnection = async () => {
  return mongoose.connect(process.env.MONGODB_CONNECT_URL, {
    retryWrites: true,
    w: "majority",
  });
};
