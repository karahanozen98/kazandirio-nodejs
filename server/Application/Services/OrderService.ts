import UserModel, { IUser } from "../../Repository/Models/UserModel.js";
import ProductDto from "../DTO/ProductDto.js";
import Service from "./Service.js";
import mongoose from "mongoose";

interface OrderDto {
  user: IUser & mongoose.Document<any, any, IUser>;
  orderList: { userId: string; productId: string; delivered: boolean }[];
  totalPrice: number;
  totalReward: number;
}

interface IOrderService {
  GetUsersOrders(userId: string): Promise<ProductDto[]>;
  CreateOrderByBalance(userId: string, productList: string[]): Promise<void>;
  CreateOrderByRewards(userId: string, productList: string[]): Promise<void>;
}

class OrderService extends Service implements IOrderService {
  async GetUsersOrders(userId: string): Promise<ProductDto[]> {
    const orders = await this._db.Order.find({ userId: userId });
    const productDtos = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const product = await this._db.Product.findById(order.productId);
      let category = null;

      if (product) {
        if (product.categoryId) category = (await this._db.Category.findById(product.categoryId)) || null;
        productDtos.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: category ? { id: category._id, name: category.name, rewardAmount: category.rewardAmount } : null,
        });
      }
    }
    return productDtos;
  }

  async ValidateOrderData(userId: string, productList: string[]): Promise<OrderDto> {
    const user = await this._db.User.findById(userId);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    const orderList = []; // all ordered products
    let totalPrice = 0; // total price of products
    let totalReward = 0; // total reward point which user is going to earn after buying products

    for (let i = 0; i < productList.length; i++) {
      const id = productList[i];
      const product = (await this._db.Product.findById(id)) || null;
      if (!product) throw new Error("Ürün bulunamadı");

      const category = product.categoryId ? (await this._db.Category.findById(product.categoryId)) || null : null;
      if (category) totalReward += category.rewardAmount;
      orderList.push({ userId: user._id, productId: product._id, delivered: true });
      totalPrice += product.price;
    }
    return { user, orderList, totalPrice, totalReward };
  }

  async CreateOrderByBalance(userId: string, productList: string[]): Promise<void> {
    const order = (await this.ValidateOrderData(userId, productList)) || null;
    if (!order) throw new Error("İstenmeyen bir hata oluştu. İşlem gerçekleştirilemedi.");

    if (order.user.balance >= order.totalPrice) {
      order.user.balance -= order.totalPrice;
      order.user.rewards += order.totalReward;
      await order.user.save();
      await this._db.Order.insertMany(order.orderList);
    } else throw new Error("Yetersiz bakiye");
  }

  async CreateOrderByRewards(userId: string, productList: string[]): Promise<void> {
    const order = (await this.ValidateOrderData(userId, productList)) || null;
    if (!order) throw new Error("İstenmeyen bir hata oluştu. İşlem gerçekleştirilemedi.");

    if (order.user.rewards >= order.totalPrice) {
      order.user.rewards -= order.totalPrice;
      order.user.rewards += order.totalReward;
      await order.user.save();
      await this._db.Order.insertMany(order.orderList);
    }
    else throw new Error("Yetersiz bakiye");
  }
}

export default OrderService;
