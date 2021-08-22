import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import Category from "../../Repository/Models/CategoryModel.js";
import ValidationError from "./ValidationError.js";

export const GetAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await req.services.categoryService.GetAllCategories();
  res.json(result);
});

export const GetAllCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"];
  if (!id) throw new ValidationError();

  const result = await req.services.categoryService.GetCategoryById(id);
  res.json(result);
});

export const CreateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, rewardAmount } = req.body;
  if (!name || isNaN(rewardAmount)) throw new ValidationError();
  const category = new Category({ name, rewardAmount });
  await req.services.categoryService.CreateCategory(category);

  res.json("Ok");
});
