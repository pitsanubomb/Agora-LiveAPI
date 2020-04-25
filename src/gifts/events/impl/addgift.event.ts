import { Gifts } from "src/gifts/entity/gifts.entity";

export class AddGiftEvent {
    constructor(
        public readonly gift:Gifts
    ){}
}