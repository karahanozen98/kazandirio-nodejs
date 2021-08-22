import Roles from "./Roles";

export default interface UserDto {
  id: string;
  username: string;
  role: typeof Roles;
  balance: number;
  rewards: number;
  token: string | null;
}
