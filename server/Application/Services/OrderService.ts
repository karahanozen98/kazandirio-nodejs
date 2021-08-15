import ProductDto from "../DTO/ProductDto.js";
import Service from "./Service.js";

interface IOrderService {
  GetUsersOrders(userId: string): Promise<ProductDto[]>;
  CreateOrderByBalance(userId: string, productId: string): Promise<void>;
  CreateOrderByRewards(userId: string, productId: string): Promise<void>;
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

  async CreateOrderByBalance(userId: string, productId: string): Promise<void> {
    const user = await this._db.User.findById(userId);
    const product = await this._db.Product.findById(productId);

    if (!user) throw new Error("User not found");
    if (!product) throw new Error("Product not found");

    const category = product.categoryId ? (await this._db.Category.findById(product.categoryId)) || null : null;

    if (user.balance >= product.price) {
      user.balance -= product.price;
      if (category) user.rewards += category.rewardAmount;
      await user.save();
      await this._db.Order.create({ userId, productId, delivered: true });
    } else throw new Error("Insufficent balance");
  }

  async CreateOrderByRewards(userId: string, productId: string): Promise<void> {
    const user = await this._db.User.findById(userId);
    const product = await this._db.Product.findById(productId);

    if (!user) throw new Error("User not found");
    if (!product) throw new Error("Product not found");

    const category = product.categoryId ? (await this._db.Category.findById(product.categoryId)) || null : null;

    if (user.rewards >= product.price) {
      user.rewards -= product.price;
      if (category) user.rewards += category.rewardAmount;
      await user.save();
      await this._db.Order.create({ userId, productId, delivered: true });
    } else if (user.balance + user.rewards >= product.price) {
      user.balance -= product.price - user.rewards;
      user.rewards = 0;
      if (category) user.rewards += category.rewardAmount;
      await user.save();
      await this._db.Order.create({ userId, productId, delivered: true });
    } else throw new Error("Insufficent balance");
  }
}

export default OrderService;
