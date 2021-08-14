import { IDBContainer } from "../../Repository/DBContainer.js";
import { Iservice } from "../../Application/Services/ServiceContainer.js";
import * as express from "express";

declare module "express-serve-static-core" {
  interface Request {
    services: Iservice;
    db: IDBContainer;
  }
}
