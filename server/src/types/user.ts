export interface IUser {
    name: string;
    email: string;
    password: string;
    walletAddress: string;
    matchPassword(password: string): Promise<boolean>;
  }