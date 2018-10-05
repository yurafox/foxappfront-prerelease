import {OrdersFilter} from '../../../../pages/your-orders/your-orders';
import {Product} from '../../../model/product';
import {PersonInfo} from '../../../model/person';
import {ClientBonus} from '../../../model/client-bonus';
import {Client} from '../../../model/client';
import {ClientAddress} from '../../../model/client-address';

export abstract class AbstractClientRepository {
  public abstract async getClientBonusesExpireInfo(): Promise<ClientBonus[]>;

  //public async abstract getBonusesInfo(): Promise<{bonusLimit: number, actionBonusLimit: number}>;

  //public abstract async getClientByUserId(id: number): Promise<Client>;

  public abstract async getClientByPhone(phonenum: string): Promise<Client>;

  public abstract async createClientAddress(address: ClientAddress): Promise<ClientAddress>;

  public abstract async deleteClientAddress(address: ClientAddress);

  public abstract async saveClientAddress(address: ClientAddress): Promise<ClientAddress>;

  public abstract async getClientAddressById(id: number): Promise<ClientAddress>;

  public abstract async getClientAddressesByClientId(id: number): Promise<ClientAddress[]>;

  public abstract async getClientOrderDatesRanges(): Promise<OrdersFilter[]>;

  public abstract async getDefaultClientOrderDatesRanges(isDefault: boolean): Promise<OrdersFilter>;

  public abstract async insertPerson(person: PersonInfo): Promise<PersonInfo>;

  public abstract async updatePerson(person: PersonInfo): Promise<PersonInfo>;

  public abstract async getPersonById(personId: number): Promise<PersonInfo>;

  public abstract async getViewProducts(): Promise<Product[]>;

  public abstract async postProductView(idProduct: number, params: string);
}
