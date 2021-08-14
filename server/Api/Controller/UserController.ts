import User from "../../Repository/Models/UserModel.js";
import { Request, Response } from "express-serve-static-core";
import asyncHandler from "express-async-handler";
import ValidationError from "./ValidationError.js";

export const GetAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await req.services.userService.GetAllUsers();
  res.json(result);
});

export const GetUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"];
  const user = await req.services.userService.GetUserById(id);
  res.json(user);
});

export const LoginWithUsernameAndPassword = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  var ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "0.0.0.1";
  if (ipAddress instanceof Array) ipAddress = ipAddress[0];

  if (!username || !password) throw new ValidationError();

  const user = await req.services.userService.LoginWithUsernameAndPassword(username, password, ipAddress);
  res.json(user);
});

export const CreateUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, role, balance, rewards } = req.body;
  if (!username || !password || !role || !balance || !rewards) throw new ValidationError();

  const newUser = new User({ username, password, role, balance, rewards });
  await req.services.userService.CreateUser(newUser);
  res.json("Ok");
});

export const LoginWithToken = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) throw new ValidationError();

  const user = await req.services.userService.LoginWithToken(token);
  res.json(user);
});
