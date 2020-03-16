import { Module } from "@nestjs/common";
import { BattlesResolver } from "./battles.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Battle } from "./entity/battles.entity";
import { BattlesService } from "./battles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Battle])],
  providers: [BattlesResolver,BattlesService]
})
export class BattlesModule {}
