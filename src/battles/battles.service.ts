import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Battle } from "./entity/battles.entity";
import { MongoRepository } from "typeorm";
import { throwError } from "rxjs";
import { BattleInput } from "./input/battles.input";
import { map } from "rxjs/internal/operators/map";

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepo: MongoRepository<Battle>,
    private httpService: HttpService
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

  async findallwithLive() {
    try {
      const res = await this.battleRepo.find({ Battlestatus: "live" });
      return res;
    } catch (error) {
      throwError(error);
    }
  }

  async findWithId(id: number) {
    try {
      const res = await this.battleRepo.findOne({ Battleid: id.toString() });
      return res;
    } catch (error) {
      throwError(error);
    }
  }

  async getLiveBattle(auth: string, c: number, size: number) {
    const header = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      return this.httpService
        .get(
          `${process.env.BACK_END_API}/battles?CurrentPage=${c}&PageSize=${size}`,
          header
        )
        .pipe(
          map((res) => {
            return res.data;
          })
        );
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้",
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getBattleReminder(auth: string, c: number, size: number, vjid: number) {
    const header = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      return this.httpService
        .get(
          `${process.env.BACK_END_API}/battles/reminder?CurrentPage=${c}&PageSize=${size}&VjUserId=${vjid}`,
          header
        )
        .pipe(
          map((res) => {
            return res.data;
          })
        );
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้",
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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
