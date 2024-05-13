import mongoose, { Schema } from "mongoose";

export interface UserModel {
  user_name: string;
  email: string;
  password: string;
}
const userSchema = new Schema(
  {
    user_name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);
const UserModel =
  mongoose.models.User || mongoose.model<UserModel>("User", userSchema);

export default UserModel;
