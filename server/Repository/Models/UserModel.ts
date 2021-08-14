import mongoose from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  role: string;
  balance: number;
  rewards: number;
  tokenId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { unique: true, required: true, type: String, min: 6, max: 30 },
  password: { required: true, type: String, min: 6, max: 16 },
  role: { required: true, type: String, max: 50 },
  balance: { required: true, type: Number },
  rewards: { required: true, type: Number },
  tokenId: { type: mongoose.Schema.Types.ObjectId, ref: "RefreshToken" },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
