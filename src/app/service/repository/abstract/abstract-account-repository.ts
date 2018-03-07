import {User,IUserVerifyAccountData} from '../../../model/index';
import {LoginTemplate} from "../../../model/index";

export abstract class AbstractAccountRepository {
  public async abstract register(user: User): Promise<User>;
  public async abstract edit(user: User, token: string): Promise<User>;
  public async abstract logIn(phone: string, password: string): Promise<LoginTemplate>;
  public async abstract getUserById(token: string): Promise<User>
  public async abstract verifyAccount(phone: string): Promise<IUserVerifyAccountData>
  //public abstract isNotSignOutSelf(): boolean;
}
