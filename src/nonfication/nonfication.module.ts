
import { NontificationController } from "./notification.controller";
import { Module } from "@nestjs/common";
import { Firebase } from "src/core/firebase.service";

@Module({
  providers: [Firebase],
  controllers: [NontificationController],
})
export class NontificationModule {}
