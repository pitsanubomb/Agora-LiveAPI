import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { SendGiftSuccessCommand } from "../impl/sendgift-success.command";
import { GiftSerivce } from "src/gifts/gifts.service";

@CommandHandler(SendGiftSuccessCommand)
export class SendGiftSuccessHandler
  implements ICommandHandler<SendGiftSuccessCommand> {
  constructor(
    private readonly giftService: GiftSerivce,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: SendGiftSuccessCommand) {
    console.log(
      clc.greenBright(`Add gift to db is : ${JSON.stringify(command)}`)
    );
    
  }
}
