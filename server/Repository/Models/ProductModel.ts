import mongoose from "mongoose";

export interface IProduct {
  _id:string;
  name: string;
  price: number;
  categoryId?: string;
  imageUrl?: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { required: true, type: String },
  price: {required:true, type:Number},
  categoryId: { required: false, type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  imageUrl: { required: false, type: String },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
