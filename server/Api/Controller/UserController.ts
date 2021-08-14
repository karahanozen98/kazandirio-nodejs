// import { Request, Response, NextFunction } from "express-serve-static-core";
// // import { autoInjectable, injectable } from "tsyringe";
// // import {
// //   services,
// //   Iservice,
// // } from "../../Application/Services/ServiceContainer";

// export default class UserController {
//   private _services: Iservice;

//   constructor(services: Iservice) {
//     this._services = services;
//   }

//   private AsyncWrapper(callback: Function) {
//     return function (req: Request, res: Response, next: NextFunction) {
//       callback(req, res, next).catch(next);
//     };
//   }

//   GetAllUsers = async (req: Request, res: Response) => {
//     const users = await this._services.userService.GetAllUsers();
//     res.send(users);
//   };

//   GetUserById = this.AsyncWrapper(async (req: Request, res: Response) => {
//     const users = await this._services.userService.GetAllUsers();
//     res.send(users);
//   });
// }
