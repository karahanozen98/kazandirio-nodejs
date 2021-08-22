import { ICategory } from "../../Repository/Models/CategoryModel.js";
import { IProduct } from "../../Repository/Models/ProductModel.js";
import ProductDto from "../DTO/ProductDto.js";
import Service from "./Service.js";

interface IProductService {
  GetAllProducts(): Promise<ProductDto[]>;
  GetProductById(id: string): Promise<ProductDto>;
  CreateProduct(product: IProduct): Promise<void>;
  UpdateProduct(id: string, name: string, price: number, categoryId: string, imageUrl: string): Promise<void>;
  DeleteProduct(productId: string): Promise<void>
}

class ProductService extends Service implements IProductService {
  async GetAllProducts(): Promise<ProductDto[]> {
    const allProducts = await this._db.Product.find();
    let productDtos = [];

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      if (product.categoryId) {
        const category = await this._db.Category.findById(product.categoryId);
        if (category) productDtos.push(this.ConvertProductToProductDto(product, category));
      } else productDtos.push(this.ConvertProductToProductDto(product, null));
    }

    return productDtos;
  }

  async GetProductById(id: string): Promise<ProductDto> {
    const product = await this._db.Product.findById(id);
    if (!product) throw new Error("Product not found");

    if (product.categoryId) {
      const category = await this._db.Category.findById(product.categoryId);
      if (category) return this.ConvertProductToProductDto(product, category);
    }
    return this.ConvertProductToProductDto(product, null);
  }

  async CreateProduct(product: IProduct): Promise<void> {
    if (product.categoryId) {
      const checkCategory = await this._db.Category.findById(product.categoryId);
      if (!checkCategory) throw new Error("Unknown category type");
    }
    await this._db.Product.create(product);
  }

  async UpdateProduct(id: string, name: string, price: number, categoryId: string, imageUrl: string): Promise<void> {
    const product = await this._db.Product.findById(id);
    if (!product) throw new Error("Güncellenecek ürün bulunamadı");
    if (price <= 0) throw new Error("Fiyat bilgisi sıfırdan küçük veya eşit olamaz");
    product.name = name;
    product.price = price;
    //product.categoryId = categoryId;
    product.imageUrl = imageUrl;
    await product.save();
  }

  async DeleteProduct(productId: string): Promise<void> {
    const product = await this._db.Product.findById(productId);
    if (!product) throw new Error("Ürün bulunamadı");
    await product.remove();
  }

  private ConvertProductToProductDto(product: IProduct, category: ICategory | null): ProductDto {
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: category ? { id: category._id, name: category.name, rewardAmount: category.rewardAmount } : null,
    };
  }
}

export default ProductService;
