import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gifts } from "./entity/gifts.entity";
import { MongoRepository } from "typeorm";
import { GiftsList } from "./dto/giftlist.dto";
import { Battle } from "src/battles/entity/battles.entity";
import { Gift } from "./models/gifts.models";
import { CreateGift } from "./dto/creategift.dto";

@Injectable()
export class GiftSerivce {
  constructor(
    @InjectRepository(Gifts) private readonly giftRepo: MongoRepository<Gifts>,
    @InjectRepository(Battle)
    private readonly battleRepo: MongoRepository<Battle>
  ) {}

  async addGift(battleid: string, giftlist: GiftsList): Promise<any> {
    try {
      let res: any;
      const gift = await this.giftRepo.findOne({
        where: {
          Battleid: battleid,
        },
      });
      if (this.giftRepo.hasId(gift)) {
        gift.giftlist = [giftlist];
        res = await this.giftRepo.save(gift);
      } else {
        const body = new Gifts();
        body.Battleid = battleid;
        body.giftlist = [giftlist];
        res = await this.giftRepo.save(body);
      }
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
}
