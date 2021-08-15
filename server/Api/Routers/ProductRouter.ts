import { Router } from "express";
import * as ProductController from "../Controller/ProductController.js";
import Authorize from "../../Application/Middleware/AuthorizationMiddeware.js";
import Roles from "../../Application/DTO/Roles.js";

const router = Router();



// Get All Products
router.get("/", ProductController.GetAllProducts);
router.get("/:id", ProductController.GetProductById);
router.post("/", Authorize([Roles.Admin]), ProductController.CreateProduct);

export default router;
