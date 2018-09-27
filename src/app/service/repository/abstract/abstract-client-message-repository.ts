import {ClientMessage} from '../../../model/client-message';

export abstract class AbstractClientMessageRepository {
  public async abstract postClientMessage(message: ClientMessage): Promise<ClientMessage>;
}
