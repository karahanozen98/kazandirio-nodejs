import mongoose from "mongoose";
import Roles from "../../Application/DTO/Roles";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  role: typeof Roles;
  balance: number;
  rewards: number;
  tokenId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { unique: true, required: true, type: String, min: 6, max: 30 },
  password: { required: true, type: String, min: 6, max: 16 },
  role: { required: true, type: String, max: 50 },
  balance: { required: true, type: Number, min: 0 },
  rewards: { required: true, type: Number, min: 0 },
  tokenId: { type: mongoose.Schema.Types.ObjectId, ref: "RefreshToken" },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
