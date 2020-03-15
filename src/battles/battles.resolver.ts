import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class BattlesResolver {
  @Query(() => String)
  async hello() {
    return "hello";
  }
}
