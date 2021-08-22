import { Router } from "express";
import * as UserController from "../Controller/UserController.js";
import Authorize from "../../Application/Middleware/AuthorizationMiddeware.js";
import Roles from "../../Application/DTO/Roles.js";

const router = Router();

// Get all users
router.get("/", Authorize([Roles.Admin]), UserController.GetAllUsers);
// Get user by id
router.get("/:id", Authorize([Roles.Admin]), UserController.GetUserById);
// Login with usermame & password
router.post("/login", UserController.LoginWithUsernameAndPassword);
// Sign up
router.post("/", UserController.CreateUser);
// Login With Token
router.post("/authorize", UserController.LoginWithToken);
// update
router.put("/", Authorize([Roles.Admin]), UserController.UpdateUser);
// deposit
router.put("/deposit", Authorize([Roles.Consumer, Roles.Admin]), UserController.UpdateBalance);

export default router;
