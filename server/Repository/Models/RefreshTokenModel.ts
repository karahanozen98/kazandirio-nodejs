import mongoose from "mongoose";

export interface IRefreshToken extends mongoose.Document {
  token: string;
  expires: Date;
  isExpired: Function;
  created: Date;
  createdByIp: string;
  active: boolean;
  revoked?: Date;
  revokedByIp?: string;
  replacedByToken?: string;
  isActive: Function;
}

export const RefreshTokenSchema = new mongoose.Schema<IRefreshToken>({
  token: { required: true, type: String },
  expires: { required: true, type: Date },
  created: { required: true, type: Date },
  createdByIp: { required: true, type: String },
  active: { required: true, type: Boolean },
  revoked: { required: false, type: Date },
  revokedByIp: { required: false, type: String },
  replacedByToken: { required: false, type: String },
});

RefreshTokenSchema.methods.isExpired = function () {
  return this.expires < new Date();
};
RefreshTokenSchema.methods.isActive = function () {
  if (!this.isExpired && this.active) return true;
  else return false;
};

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);

export default RefreshToken;
