import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { SendGiftCommand } from "../impl/sendgift.command";
import { GiftSerivce } from "src/gifts/gifts.service";

@CommandHandler(SendGiftCommand)
export class SendGiftHandler implements ICommandHandler<SendGiftCommand> {
  constructor(
    private readonly giftService: GiftSerivce,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: SendGiftCommand) {
    console.log(clc.greenBright("Send Gift now . ."));

    const { battleid, giftlist } = command;
    const gift = this.publisher.mergeObjectContext(
      await this.giftService.addGift(battleid, giftlist)
    );
    gift.sendGift();
    gift.commit();
  }
}
