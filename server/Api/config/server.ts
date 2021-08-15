import express from "express";
import Cors from "cors";
import DependencyInjectionMiddleWare from "../../Application/Middleware/DependencyInjectionMiddleware.js";
import ErrorHandlerMiddleWare from "../../Application/Middleware/ErrorHandlerMiddleware.js";
import UserRouter from "../Routers/UserRouter.js";
import CategoryRouter from "../Routers/CategoryRouter.js";
import ProductRouter from "../Routers/ProductRouter.js"
import OrderRouter from "../Routers/OrderRouter.js"

const server = express();
server.use(Cors());
server.use(express.json());

// Depency injection middleware to inject all services to all controllers
server.use("/", DependencyInjectionMiddleWare);

// Routes
server.use("/users",UserRouter);
server.use("/categories",CategoryRouter);
server.use("/products", ProductRouter);
server.use("/orders", OrderRouter);

// Use Error handler middleware
// Must be at the bottom of everything
server.use("/",ErrorHandlerMiddleWare);

export default server;
