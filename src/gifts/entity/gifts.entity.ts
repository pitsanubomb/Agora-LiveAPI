import { Entity, ObjectIdColumn, Column } from "typeorm";
import { GiftsList } from "../dto/giftlist.dto";

@Entity()
export class Gifts {
  @ObjectIdColumn()
  id: number;
  @Column()
  Battleid: string;
  @Column((type) => GiftsList)
  giftlist: GiftsList[];
}
