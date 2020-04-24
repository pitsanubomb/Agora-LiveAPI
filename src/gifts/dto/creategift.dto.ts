import { GiftsList } from "./giftlist.dto";

export class CreateGift {
  id: number;
  Battleid: string;
  giftlist: [GiftsList];
}
