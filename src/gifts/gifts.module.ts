import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gifts } from "./entity/gifts.entity";
import { GiftSerivce } from "./gifts.service";
import { GiftController } from "./gift.controller";
import { SendGiftHandler } from "./command/handlers/sendgift.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { Battle } from "src/battles/entity/battles.entity";
import { SendGiftSaga } from "./saga/sendgift.saga";
import { AddGiftEvent } from "./events/impl/addgift.event";
import { SendGiftSuccessHandler } from "./command/handlers/sendgift-success.handler";
import { GenUidService } from "src/core/genuid.service";


@Module({
  imports: [TypeOrmModule.forFeature([Gifts, Battle]), CqrsModule],
  providers: [
    GiftSerivce,
    SendGiftHandler,
    SendGiftSuccessHandler,
    AddGiftEvent,
    SendGiftSaga,
    GenUidService
  ],
  controllers: [GiftController],
})
export class GiftsModule {}
