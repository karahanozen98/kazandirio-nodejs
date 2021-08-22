import { Router } from "express";
import * as ProductController from "../Controller/ProductController.js";
import Authorize from "../../Application/Middleware/AuthorizationMiddeware.js";
import Roles from "../../Application/DTO/Roles.js";

const router = Router();

// Get All Products
router.get("/", Authorize([Roles.Consumer, Roles.Admin]), ProductController.GetAllProducts);
router.get("/:id", Authorize([Roles.Consumer, Roles.Admin]), ProductController.GetProductById);
// create product
router.post("/", Authorize([Roles.Admin]), ProductController.CreateProduct);
// update product
router.put("/", Authorize([Roles.Admin]), ProductController.UpdateProduct);
// delete product
router.delete("/", Authorize([Roles.Admin]), ProductController.DeleteProduct);

export default router;
