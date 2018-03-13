import {User,IUserVerifyAccountData,IUserInfo,LoginTemplate,ChangePassword} from '../../../model/index';


export abstract class AbstractAccountRepository {
  public async abstract register(user: User): Promise<IUserInfo>;
  public async abstract edit(user: User): Promise<IUserInfo>;
  public async abstract logIn(phone: string, password: string): Promise<LoginTemplate>;
  public async abstract getUserById(token: string): Promise<User>;
  public async abstract verifyAccount(phone: string): Promise<IUserVerifyAccountData>;
  public async abstract changePassword(passwordModel:ChangePassword):Promise<IUserVerifyAccountData>;
  //public abstract isNotSignOutSelf(): boolean;
}
