import { AggregateRoot } from "@nestjs/cqrs";
import { AddGiftEvent } from "../events/impl/addgift.event";
import { CreateGift } from "../dto/creategift.dto";

export class Gift extends AggregateRoot {
  constructor(private readonly gift:CreateGift) {
    super();
  }

  sendGift() {
    this.apply(new AddGiftEvent(this.gift));
  }
}
