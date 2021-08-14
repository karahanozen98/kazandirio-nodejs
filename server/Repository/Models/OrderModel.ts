import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  userId: string;
  productId: string;
  delivered: boolean;
}

export interface OrderDocument extends mongoose.Document<IOrder> {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  delivered: boolean;
}

export const OrderSchema = new mongoose.Schema({
  userId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
export default Order;
