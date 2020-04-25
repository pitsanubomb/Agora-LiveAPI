import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gifts } from "./entity/gifts.entity";
import { MongoRepository } from "typeorm";
import { GiftsList } from "./dto/giftlist.dto";
import { Battle } from "src/battles/entity/battles.entity";
import { Gift } from "./models/gifts.models";

@Injectable()
export class GiftSerivce {
  constructor(
    @InjectRepository(Gifts) private readonly giftRepo: MongoRepository<Gifts>,
    @InjectRepository(Battle)
    private readonly battleRepo: MongoRepository<Battle>
  ) {}

  async addGift(battleid: string, giftlist: GiftsList): Promise<Gift> {
    try {
      let res: any;
      const body = giftlist;
      body.Battleid = battleid;
      res = await this.giftRepo.save(body);
      return new Gift(res);
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้ : " + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async clearAll(): Promise<any> {
    try {
      return await this.giftRepo.clear();
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้ : " + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBattleId(id: string): Promise<any> {
    try {
      return await this.battleRepo.findOne({
        where: {
          Battleid: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้ : " + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getGiftByBattleId(battleid: string): Promise<any> {
    try {
      return await this.giftRepo.find({
        where: {
          Battleid: battleid,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้ : " + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateScore(
    vjid: number,
    battleid: string,
    score: number
  ): Promise<any> {
    try {
      const res = await this.getBattleId(battleid);
      if (res.vj1_ccuteid === vjid) {
        res.vj1_score = res.vj1_score + score;
        return await this.battleRepo.save(res);
      } else {
        res.vj2_score = res.vj2_score + score;
        return await this.battleRepo.save(res);
      }
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถทำรายการได้ : " + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
