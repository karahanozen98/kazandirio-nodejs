import UserService from "../Services/UserService.js";
import CategoryService from "./CategoryService.js";
import ProductService from "./ProductService.js"
import { container } from "tsyringe";
import DBContainer, { IDBContainer } from "../../Repository/DBContainer.js";


function ServiceContainer() {
  return Object.freeze({
    userService: new UserService(DBContainer),
    categoryService: new CategoryService(DBContainer),
    productService: new ProductService(DBContainer),
  });
}

const services = ServiceContainer();
type Iservice = typeof services;

export { services, Iservice };
