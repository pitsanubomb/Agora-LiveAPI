import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gifts } from "./entity/gifts.entity";
import { MongoRepository } from "typeorm";
import { GiftsList } from "./dto/giftlist.dto";

@Injectable()
export class GiftSerivce {
  constructor(
    @InjectRepository(Gifts) private readonly giftRepo: MongoRepository<Gifts>
  ) {}

  async addGift(battleid: string, giftlist: GiftsList): Promise<any> {
    try {
      const gift = await this.giftRepo.findOne({
        where: {
          Battleid: battleid,
        },
      });
      if (this.giftRepo.hasId(gift)) {
        gift.giftlist = [giftlist];
        return await this.giftRepo.save(gift);
      } else {
        const body = new Gifts();
        body.Battleid = battleid;
        body.giftlist = [giftlist];
        return await this.giftRepo.save(body);
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
