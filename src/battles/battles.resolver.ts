import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
  ID
} from "@nestjs/graphql";
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
    pubSub.publish("battleList", { battleList: this.btService.findall() });
    return res;
  }

  @Mutation(() => Boolean)
  async deleteBattle(@Args("id") id: String): Promise<any> {
    let isFlag = false;
    const check = await this.btService.delBattle(id);
    if (check) {
      isFlag = true;
    }
    return isFlag;
  }

  @Mutation(() => Boolean)
  async clearallBattle():Promise<any>
  {
    await this.btService.clearallBattle();
    return true;
  }

  @Subscription(() => [BattleType])
  battleList() {
    return pubSub.asyncIterator("battleList");
  }
}
