import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import ValidationError from "./ValidationError.js";
import Product from "../../Repository/Models/ProductModel.js";

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
    const { name, price, categoryId } = req.body;
    if (!name || !price ) throw new ValidationError();
    const product = new Product({ name, price, categoryId });
    await req.services.productService.CreateProduct(product);
  
    res.json("Ok");
  });