import { GiftsList } from "src/gifts/dto/giftlist.dto";

export class SendGiftCommand {
  constructor(
    public readonly battleid: string,
    public readonly giftlist: GiftsList
  ) {}
}
