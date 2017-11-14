import {User} from '../../../model/index';

export abstract class AbstractAccountRepository {
  public async abstract register(user: User): Promise<User>;
  public async abstract edit(user: User): Promise<User>;
  public async abstract logIn(email: string, password: string): Promise<string>;
  public async abstract getUserById(id: number): Promise<User>;
  public abstract logOut(): void;
  public abstract isNotSignOutSelf(): boolean;
}
