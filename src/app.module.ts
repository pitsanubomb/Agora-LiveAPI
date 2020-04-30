import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { BattlesModule } from "./battles/battles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftsModule } from "./gifts/gifts.module";
import { NontificationModule } from "./gifts/nonfication/nonfication.module";

@Module({
  imports: [
    BattlesModule,
    GiftsModule,
    NontificationModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
    }),
  ],
})
export class AppModule {}
