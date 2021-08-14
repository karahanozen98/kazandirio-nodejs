import { Router } from "express";
import * as CategoryControler from "../Controller/CategoryController.js";
const router = Router();

// Get all categories
router.get("/", CategoryControler.GetAllCategories);
router.get("/:id", CategoryControler.GetAllCategoryById);
router.post("/", CategoryControler.CreateCategory);

export default router;
