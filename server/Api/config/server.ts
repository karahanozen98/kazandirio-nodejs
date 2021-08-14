import express from "express";
import Cors from "cors";
import DependencyInjectionMiddleWare from "../../Application/Middleware/DependencyInjectionMiddleware.js";
import ErrorHandlerMiddleWare from "../../Application/Middleware/ErrorHandlerMiddleware.js";
import routes from "../routes/UserRouter.js";

const server = express();
server.use(Cors());
server.use(express.json());

server.use("/", DependencyInjectionMiddleWare);
server.use("/",routes);
// Use Error handler middleware
// Must be at the bottom of everything
server.use("/",ErrorHandlerMiddleWare);

export default server;
