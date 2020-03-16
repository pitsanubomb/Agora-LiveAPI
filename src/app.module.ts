import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { BattlesModule } from "./battles/battles.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    BattlesModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql"
    })
  ]
})
export class AppModule {}
