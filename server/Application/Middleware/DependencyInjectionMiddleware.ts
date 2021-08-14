import { Request, Response, NextFunction } from "express-serve-static-core";
import DBContainer from "../../Repository/DBContainer.js";
import { services } from "../Services/ServiceContainer.js";

function DependencyInjectionMiddleWare(req: Request, _: Response, next: NextFunction) {  
  req.services = services;
  req.db = DBContainer;
  next();
}

export default DependencyInjectionMiddleWare;
