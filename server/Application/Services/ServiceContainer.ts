import UserService from "../Services/UserService.js";
import CategoryService from "./CategoryService.js";
import ProductService from "./ProductService.js";
import OrderService from "./OrderService.js";
import DBContainer from "../../Repository/DBContainer.js";

function ServiceContainer() {
  return Object.freeze({
    userService: new UserService(DBContainer),
    categoryService: new CategoryService(DBContainer),
    productService: new ProductService(DBContainer),
    orderService: new OrderService(DBContainer),
  });
}

const services = ServiceContainer();
type Iservice = typeof services;

export { services, Iservice };
