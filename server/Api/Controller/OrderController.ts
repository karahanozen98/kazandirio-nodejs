import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import ValidationError from "./ValidationError.js";

interface OrderDto {
  userId: string;
  productList: string[];
}

export const GetOrdersById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) throw new ValidationError();
  const result = await req.services.orderService.GetUsersOrders(userId);
  res.json(result);
});

export const CreateOrderByBalance = asyncHandler(async (req: Request, res: Response) => {
  const order: OrderDto = { userId: req.body.userId, productList: req.body.productList } || null;
  if (!order.userId || !order.productList) throw new ValidationError();
  await req.services.orderService.CreateOrderByBalance(order.userId, order.productList);

  res.json("Ok");
});

export const CreateOrderByRewards = asyncHandler(async (req: Request, res: Response) => {
  const order: OrderDto = { userId: req.body.userId, productList: req.body.productList } || null;
  if (!order.userId || !order.productList) throw new ValidationError();
  await req.services.orderService.CreateOrderByRewards(order.userId, order.productList);

  res.json("Ok");
});
