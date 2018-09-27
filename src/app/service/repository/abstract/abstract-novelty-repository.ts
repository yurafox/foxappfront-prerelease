import {Novelty} from "../../../model/novelty";
import {NoveltyDetails} from "../../../model/novelty-det";

export abstract class AbstractNoveltyRepository {
  public async abstract getNovelty(id: number): Promise<Novelty>;
  public async abstract getNovelties(): Promise<Novelty[]>;
  public async abstract getNoveltyDetailsByNoveltyId(id: number): Promise<NoveltyDetails[]>;
}
