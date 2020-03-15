import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { BattlesModule } from "./battles/battles.module";

@Module({
  imports: [
    BattlesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql"
    })
  ]
})
export class AppModule {}
