import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Battle } from "./entity/battles.entity";
import { MongoRepository } from "typeorm";
import { throwError } from "rxjs";
import { BattleInput } from "./input/battles.input";

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepo: MongoRepository<Battle>
  ) {}
  async create(createBattle: BattleInput): Promise<Battle> {
    try {
      const savedata = await this.battleRepo.create(createBattle);
      return await this.battleRepo.save(savedata);
    } catch (error) {
      throwError(error);
    }
  }
  async findall(): Promise<any> {
    try {
      return this.battleRepo.find();
    } catch (error) {
      throwError(error);
    }
  }
}
