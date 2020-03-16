import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { BattleInput } from "./input/battles.input";
import { BattleType } from "./dto/battles.dto";
import { BattlesService } from "./battles.service";

const pubSub = new PubSub();
const BATTLE_LIST = "battle";

@Resolver()
export class BattlesResolver {
  constructor(private readonly btService: BattlesService) {}

  @Query(() => [BattleType])
  async getBalltle() {
    return this.btService.findall();
  }

  @Mutation(() => BattleType)
  async createBattle(@Args("input") input: BattleInput): Promise<any> {
    const res = await this.btService.create(input);
    pubSub.publish("battleCreate", { battleCreate: this.btService.findall() });
    return res;
  }

  @Subscription(() => [BattleType])
  battleCreate() {
    return pubSub.asyncIterator("battleCreate");
  }
}
