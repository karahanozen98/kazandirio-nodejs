import { Router } from "express";
import * as UserController from "../Controller/UserController.js";

const router = Router();

// Get all users
router.get("/", UserController.GetAllUsers);

// Get user by id
router.get("/:id", UserController.GetUserById);

// Login with usermame & password
router.post("/login", UserController.LoginWithUsernameAndPassword);

// Create User
router.post("/", UserController.CreateUser);

// Login With Token
router.post("/authorize", UserController.LoginWithToken);

export default router;
