import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import ValidationError from "./ValidationError.js";
import Product from "../../Repository/Models/ProductModel.js";
import mongoose, { mongo } from "mongoose";

export const GetAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await req.services.productService.GetAllProducts();
  res.json(result);
});

export const GetProductById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"];
  if (!id) throw new ValidationError();

  const result = await req.services.productService.GetProductById(id);
  res.json(result);
});

export const CreateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, categoryId, imageUrl } = req.body;
  if (!name || !price) throw new ValidationError();

  if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
    const product = new Product({ name, price, categoryId, imageUrl });
    // mongoose can not assign categoryId to Product object.
    if (!product.categoryId) throw new Error("Kategori bulunmadı");

    await req.services.productService.CreateProduct(product);
  } else if (!categoryId) {
    const product = new Product({ name, price, imageUrl });
    await req.services.productService.CreateProduct(product);
  }
  res.json("Ok");
});

export const UpdateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, price, categoryId, imageUrl } = req.body;
  if (!id || !name || !price) throw new ValidationError();
  await req.services.productService.UpdateProduct(id, name, price, categoryId, imageUrl);
  res.json("Ok");
});

export const DeleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const {productId } = req.body;
  if (!productId) throw new ValidationError();
  await req.services.productService.DeleteProduct(productId);
  res.json("Ok");
});