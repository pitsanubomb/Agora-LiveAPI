import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gifts } from "./entity/gifts.entity";
import { GiftSerivce } from "./gifts.service";
import { GiftController } from "./gift.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Gifts])],
  providers: [GiftSerivce],
  controllers: [GiftController],
})
export class GiftsModule {}
