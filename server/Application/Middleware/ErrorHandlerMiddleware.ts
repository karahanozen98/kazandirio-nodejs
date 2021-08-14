import { Request, Response, NextFunction } from "express-serve-static-core";

function ErrorHandlerMiddleWare(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error) {
    res.status(400).json(error.message);
  } else next();
}

export default ErrorHandlerMiddleWare;
