import { Request, Response, NextFunction } from "express-serve-static-core";
import jsonWebToken from "jsonwebtoken";

function Authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    const secret = process.env.SECRET_TOKEN;

    if (bearerHeader && secret) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const options = jsonWebToken.verify(bearerToken, secret, { algorithms: ["HS256"] });

      if (roles.includes((<any>options).role)) next();
      else res.status(403).json("You do not have permission");
    } else {
      // Forbidden
      res.status(403).json("You are not authorized");
    }
  };
}
export default Authorize;
