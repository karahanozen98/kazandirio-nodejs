import UserService from "../Services/UserService.js";
import AuthService from "../Services/AuthService.js";
import { container } from "tsyringe";
import DBContainer, { IDBContainer } from "../../Repository/DBContainer.js";

function ServiceContainer() {
  return Object.freeze({
    userService: new UserService(DBContainer),
  });
}

const services = ServiceContainer();
type Iservice = typeof services;

export { services, Iservice };
