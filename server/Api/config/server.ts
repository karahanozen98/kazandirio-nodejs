import express from "express";
import Cors from "cors";
import DependencyInjectionMiddleWare from "../../Application/Middleware/DependencyInjectionMiddleware.js";
import ErrorHandlerMiddleWare from "../../Application/Middleware/ErrorHandlerMiddleware.js";
import UserRouter from "../routes/UserRouter.js";
import CategoryRouter from "../routes/CategoryRouter.js";
import ProductRouter from "../routes/ProductRouter.js"

const server = express();
server.use(Cors());
server.use(express.json());

// Depency injection middleware to inject all services to all controllers
server.use("/", DependencyInjectionMiddleWare);

// Routes
server.use("/users",UserRouter);
server.use("/categories",CategoryRouter);
server.use("/products", ProductRouter);

// Use Error handler middleware
// Must be at the bottom of everything
server.use("/",ErrorHandlerMiddleWare);

export default server;
