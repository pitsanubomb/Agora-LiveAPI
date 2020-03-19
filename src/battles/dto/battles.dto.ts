import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class BattleType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly Battleid: string;
  @Field()
  readonly Battlename: string;
  @Field()
  readonly Battlecover: string;
  @Field()
  readonly Battlestatus: string;
  @Field()
  readonly vj1_ccuteid: number;
  @Field({ nullable: true })
  readonly vj2_ccuteid: number;
  @Field()
  readonly vj1_score: number;
  @Field()
  readonly vj2_score: number;
}
