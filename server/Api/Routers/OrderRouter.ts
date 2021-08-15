import { Router } from "express";
import Roles from "../../Application/DTO/Roles.js";
import Authorize from "../../Application/Middleware/AuthorizationMiddeware.js";
import * as OrderController from "../Controller/OrderController.js";

const router = Router();

router.get("/myorders", Authorize([Roles.Admin, Roles.Consumer]), OrderController.GetOrdersById);
router.post("/balance", Authorize([Roles.Admin, Roles.Consumer]), OrderController.CreateOrderByBalance);
router.post("/rewards", Authorize([Roles.Admin, Roles.Consumer]), OrderController.CreateOrderByRewards);

export default router;