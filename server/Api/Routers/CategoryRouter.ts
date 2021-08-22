import { Router } from "express";
import * as CategoryControler from "../Controller/CategoryController.js";
import Authorize from "../../Application/Middleware/AuthorizationMiddeware.js";
import Roles from "../../Application/DTO/Roles.js";

const router = Router();

// Get all categories
router.get("/", Authorize([Roles.Consumer, Roles.Admin]), CategoryControler.GetAllCategories);
router.get("/:id", Authorize([Roles.Consumer, Roles.Admin]), CategoryControler.GetAllCategoryById);
// create category
router.post("/", Authorize([Roles.Admin]), CategoryControler.CreateCategory);

export default router;
