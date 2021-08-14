import { Router } from "express";
import * as ProductController from "../Controller/ProductController.js"

const router = Router();

// Get All Products
router.get("/", ProductController.GetAllProducts);
router.get("/:id", ProductController.GetProductById);
router.post("/", ProductController.CreateProduct);

export default router;