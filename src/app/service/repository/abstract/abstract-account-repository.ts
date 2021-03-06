import {IUserInfo, IUserVerifyAccountData, User} from '../../../model/user';
import {LoginTemplate} from '../../../model/login-template';
import {ChangePassword} from '../../../model/change-password';

export abstract class AbstractAccountRepository {
  public async abstract register(user: User): Promise<IUserInfo>;
  public async abstract edit(user: User): Promise<IUserInfo>;
  public async abstract logIn(phone: string, password: string): Promise<LoginTemplate>;
  public async abstract getUserById(token: string): Promise<User>;
  public async abstract verifyAccount(phone: string): Promise<IUserVerifyAccountData>;
  public async abstract changePassword(passwordModel:ChangePassword):Promise<IUserVerifyAccountData>;
  public async abstract getBonusesInfo(): Promise<{bonusLimit: number, actionBonusLimit: number}>;
  public async abstract callMe(phone: string);
  //public abstract isNotSignOutSelf(): boolean;
}
