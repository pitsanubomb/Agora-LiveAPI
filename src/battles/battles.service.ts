import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
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
      const res = await this.battleRepo.find();
      return res;
    } catch (error) {
      throwError(error);
    }
  }

  async delBattle(id: any): Promise<any> {
    try {
      return await this.battleRepo.delete(id);
    } catch (error) {
      throwError(error);
    }
  }

  async clearallBattle(): Promise<any> {
    try {
      return await this.battleRepo.clear();
    } catch (error) {
      throwError(error);
    }
  }

  async updateBattleStatus(id: string, status: string): Promise<any> {
    try {
      const body = await this.battleRepo.findOne(id);
      body.Battlestatus = status;
      return await this.battleRepo.save(body);
    } catch (error) {
      throwError(error);
    }
  }
}
