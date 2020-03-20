import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class BattleInput {
  @Field()
  readonly Battleid: string;
  @Field()
  readonly Battlename: string;
  @Field()
  readonly Battlestatus: string;
  @Field(() => Int)
  readonly vj1_ccuteid: number;
  @Field(() => Int)
  readonly vj2_ccuteid: number;
  @Field()
  readonly vj1_cover: string;
  @Field()
  readonly vj2_cover: string;
  @Field()
  readonly vj1_score: number;
  @Field()
  readonly vj2_score: number;
  @Field()
  readonly battletime: Date;
  @Field()
  readonly channelid:string;
}
