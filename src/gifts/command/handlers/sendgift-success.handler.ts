import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { SendGiftSuccessCommand } from "../impl/sendgift-success.command";

@CommandHandler(SendGiftSuccessCommand)
export class SendGiftSuccessHandler
  implements ICommandHandler<SendGiftSuccessCommand> {
  constructor() {}

  async execute(command: SendGiftSuccessCommand) {
    console.log(clc.greenBright(`Add gift to db is : ${JSON.stringify(command)}`));
  }
}
