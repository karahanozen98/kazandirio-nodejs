import mongoose from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  categoryId: mongoose.Schema.Types.ObjectId;
  imageUrl: string;
}

const ProductSchema = new mongoose.Schema({
  name: { required: true, type: String },
  rewardAmount: { required: true, type: Number },
  categoryId: { required: false, type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  imageUrl: { required: false, type: String },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
