import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  userId: string;
  productId: string;
  delivered: boolean;
}

export const OrderSchema = new mongoose.Schema<IOrder>({
  userId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  delivered: { required: false, type: Boolean },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
