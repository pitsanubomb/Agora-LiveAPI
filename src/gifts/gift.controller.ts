import { Controller, Post, Param, Body } from "@nestjs/common";
import { GiftSerivce } from "./gifts.service";
import { GiftsList } from "./dto/giftlist.dto";

@Controller("gifts")
export class GiftController {
  constructor(private readonly giftService: GiftSerivce) {}

  @Post("battle/:id")
  async addgift(
    @Param("id") id: string,
    @Body() body: GiftsList
  ): Promise<any> {
    return await this.giftService.addGift(id, body);
  }
}
