import { Injectable } from "@nestjs/common";
import * as clc from "cli-color";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AddGiftEvent } from "../events/impl/addgift.event";
import { SendGiftSuccessCommand } from "../command/impl/sendgift-success.command";

@Injectable()
export class SendGiftSaga {
  @Saga()
  sendGift = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      ofType(AddGiftEvent),
      map((event) => {
        console.log(clc.redBright("Add gift complete"));
        return new SendGiftSuccessCommand(
          event.gift.id,
          event.gift.Battleid,
          event.gift.transectionid
        );
      })
    );
  };
}
