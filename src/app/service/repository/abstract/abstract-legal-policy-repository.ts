export abstract class AbstractLegalPolicyRepository {
  public async abstract getLegalPolicy(langId: string): Promise<string>;
}
