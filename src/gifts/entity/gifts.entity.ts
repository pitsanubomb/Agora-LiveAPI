import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Gifts {
  @ObjectIdColumn()
  id: number;
  @Column()
  Battleid: string;
  @Column()
  transectionid: string;
  @Column()
  giftid: number;
  @Column()
  ccuteid: number;
  @Column()
  vjid: number;
  @Column()
  price: number;
  @Column()
  expvj: number;
  @Column()
  expuser: number;
  @Column()
  vjrecivecoin: number;
  @Column()
  agencyrecivecoin: number;
  @Column()
  ccuterecivecoin: number;
}
