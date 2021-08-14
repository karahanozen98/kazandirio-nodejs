import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import UserDto from "../../Application/DTO/UserDto";
import User from "../../Repository/Models/UserModel.js";

// This wrapper function is for async error handling //
function AsyncWrapper(callback: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    callback(req, res, next).catch(next);
  };
}

const router = Router();

router.get(
  "/users",
  AsyncWrapper(async (req: Request, res: Response) => {
    const result = await req.services.userService.GetAllUsers();
    res.json(result);
  })
);

router.get(
  "/users/:id",
  AsyncWrapper(async (req: Request, res: Response) => {
    const id = req.params["id"];
    const user = await req.services.userService.GetUserById(id);
    res.json(user);
  })
);

router.post(
  "/users/login",
  AsyncWrapper(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    var ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "0.0.0.1";
    if(ipAddress instanceof Array ) ipAddress = ipAddress[0];

    if (!username || !password) throw new Error("Validation Error");
    
    const user = await req.services.userService.LoginWithUsernameAndPassword(username, password, ipAddress);
    res.json(user);
  })
);

// Create User
router.post(
  "/users/",
  AsyncWrapper(async (req: Request, res: Response) => {
    const { username, password, role, balance, rewards } = req.body;
    if (!username || !password || !role || !balance || !rewards) throw new Error("Validation Error");

    const newUser = new User({ username, password, role, balance, rewards });
    const user = await req.services.userService.CreateUser(newUser);
    res.json("Ok");
  })
);

// Login With Token
router.post(
  "/users/authorize",
  AsyncWrapper(async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) throw new Error("Validation Error");

    const user = await req.services.userService.LoginWithToken(token);
    res.json(user);
  })
);

export default router;
