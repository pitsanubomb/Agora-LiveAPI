import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { AddGiftEvent } from "../impl/addgift.event";

@EventsHandler(AddGiftEvent)
export class AddgiftHandlers implements IEventHandler<AddGiftEvent> {
  handle(event: AddGiftEvent) {
    console.log(clc.yellowBright("Send gift success . . "));
  }
}
