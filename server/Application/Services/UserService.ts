import UserDto from "../DTO/UserDto.js";
import { IUser } from "../../Repository/Models/UserModel.js";
import { injectable } from "tsyringe";
import AuthService from "./AuthService.js";
import RefreshToken from "../../Repository/Models/RefreshTokenModel.js";
import Service from "./Service.js";

interface IUserService {
  GetAllUsers(): Promise<IUser[]>;
  GetUserById(id: string): Promise<IUser>;
  LoginWithUsernameAndPassword(username: string, password: string, ipAddress: string): Promise<UserDto>;
  LoginWithToken(tokenString: string): Promise<UserDto>;
  CreateUser(user: IUser): Promise<void>;
}

@injectable()
class UserService extends Service implements IUserService {
  async GetAllUsers(): Promise<IUser[]> {
    return await this._db.User.find();
  }

  async GetUserById(id: string): Promise<IUser> {
    const user = await this._db.User.findById(id);
    if (!user) throw new Error("User not found");

    return user;
  }

  async LoginWithUsernameAndPassword(username: string, password: string, ipAddress: string): Promise<UserDto> {
    const user = await this._db.User.findOne({ username: username, password: password });
    if (!user) throw new Error("Wrong username or password");

    // if user alreay has a token, Deactivate the old token
    if (user.tokenId) {
      const token = await this._db.RefreshToken.findById(user.tokenId);
      if (token) {
        token.active = false;
        await token.save();
      }
    }
    // Generate new token
    const token = AuthService.GenerateRefreshToken(user);
    const created = new Date();
    const expires = new Date();
    expires.setDate(created.getDate() + 30);

    const newToken = new RefreshToken({ token: token, created: created, active: true, expires: expires, createdByIp: ipAddress });
    const createdToken = await this._db.RefreshToken.create(newToken);

    if (!createdToken) throw new Error("Token not found");

    user.tokenId = createdToken._id;
    await user.save();

    return this.ConvertUserToUserDto(user, createdToken.token);
  }

  async LoginWithToken(tokenString: string): Promise<UserDto> {
    const refreshToken = await this._db.RefreshToken.findOne({ token: tokenString });

    if (!refreshToken) throw new Error("Invalid Token");
    if (!refreshToken.isActive) throw new Error("Expired Token");

    const user = await this._db.User.findOne({ tokenId: refreshToken._id });
    if (!user) throw new Error("Token is not assigned to any user");

    const expires = new Date();
    expires.setDate(new Date().getDate() + 30);

    refreshToken.expires = expires;
    await refreshToken.save();
    return this.ConvertUserToUserDto(user, tokenString);
  }

  async CreateUser(user: IUser): Promise<void> {
    await this._db.User.create(user);
  }

  private ConvertUserToUserDto(user: IUser, token: string): UserDto {
    return { id: user._id, username: user.username, role: user.role, balance: user.balance, rewards: user.rewards, token: token };
  }
}

export default UserService;
