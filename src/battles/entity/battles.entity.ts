import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Battle {
  @ObjectIdColumn()
  id: number;
  @Column()
  Battleid: string;
  @Column()
  Battlename: string;
  @Column()
  Battlestatus: string;
  @Column()
  vj1_ccuteid: number;
  @Column()
  vj2_ccuteid: number;
  @Column()
  vj1_cover: string;
  @Column()
  vj2_cover: string;
  @Column()
  vj1_score: number;
  @Column()
  vj2_score: number;
  @Column()
  battletime: Date;
  @Column()
  channelid: String;
}
