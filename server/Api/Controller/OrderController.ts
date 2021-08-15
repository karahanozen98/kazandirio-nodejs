import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import ValidationError from "./ValidationError.js";

export const GetOrdersById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) throw new ValidationError();
  const result = await req.services.orderService.GetUsersOrders(userId);
  res.json(result);
});

export const CreateOrderByBalance = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) throw new ValidationError();
  await req.services.orderService.CreateOrderByBalance(userId, productId);

  res.json("Ok");
});

export const CreateOrderByRewards = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) throw new ValidationError();
  await req.services.orderService.CreateOrderByRewards(userId, productId);

  res.json("Ok");
});
