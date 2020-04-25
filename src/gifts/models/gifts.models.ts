import { AggregateRoot } from "@nestjs/cqrs";
import { AddGiftEvent } from "../events/impl/addgift.event";
import { Gifts } from "../entity/gifts.entity";

export class Gift extends AggregateRoot {
  constructor(private readonly gift:Gifts) {
    super();
  }

  sendGift() {
    this.apply(new AddGiftEvent(this.gift));
  }
}
