import jsonWebToken from "jsonwebtoken";
import { IUser } from "../../Repository/Models/UserModel";

abstract class AuthService {
  static GenerateRefreshToken(user: IUser) {
    const secret = process.env.SECRET_TOKEN;
    if (!secret)
      throw new Error("An unknown error occured during your request.");
    const token = jsonWebToken.sign({ id: user._id, role: user.role }, secret);
    return token;
  }
}

export default AuthService;
