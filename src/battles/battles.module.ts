import { Module } from "@nestjs/common";
import { BattlesResolver } from "./battles.resolver";

@Module({
  imports: [BattlesResolver]
})
export class BattlesModule {}
