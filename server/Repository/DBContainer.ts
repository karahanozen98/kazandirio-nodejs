import User from "./Models/UserModel.js";
import Product from "./Models/ProductModel.js";
import Category from "./Models/CategoryModel.js";
import RefreshToken from "./Models/RefreshTokenModel.js";
import Order from "./Models/OrderModel.js";

export const DBContainer = {
  User,
  Product,
  Category,
  RefreshToken,
  Order,
};
Object.freeze(DBContainer);

export default DBContainer;
export type IDBContainer = typeof DBContainer;