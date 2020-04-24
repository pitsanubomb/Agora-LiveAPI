import { GiftsList } from "src/gifts/dto/giftlist.dto";

export class SendGiftSuccessCommand {
  constructor(
    public readonly id: number,
    public readonly battleid: string,
    public readonly gift: [GiftsList]
  ) {}
}
