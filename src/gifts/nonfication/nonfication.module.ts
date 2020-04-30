import { Firebase } from "./../../core/firebase.service";
import { NontificationController } from "./notification.controller";
import { Module } from "@nestjs/common";

@Module({
  providers: [Firebase],
  controllers: [NontificationController],
})
export class NontificationModule {}
