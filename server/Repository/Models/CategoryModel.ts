import mongoose from "mongoose";

export interface ICategory {
  name: string;
  rewardAmount: number;
}

export const CategorySchema = new mongoose.Schema<ICategory>({
  name: { required: true, type: String },
  rewardAmount: { required: true, type: Number },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
