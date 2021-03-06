import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { BattlesModule } from "./battles/battles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftsModule } from "./gifts/gifts.module";
import { NontificationModule } from "./nonfication/nonfication.module";
import { LiveModule } from "./live/live.module";

@Module({
  imports: [
    BattlesModule,
    GiftsModule,
    NontificationModule,
    LiveModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
    }),
  ],
})
export class AppModule {}
