import { CreateGift } from "src/gifts/dto/creategift.dto";

export class AddGiftEvent {
    constructor(
        public readonly gift:CreateGift
    ){}
}