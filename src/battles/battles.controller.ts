import { Battle } from "./entity/battles.entity";
import { Controller, Get, Param, Put, Headers, Query } from "@nestjs/common";
import { BattlesService } from "./battles.service";

@Controller("battles")
export class BattlesController {
  constructor(private readonly battleService: BattlesService) {}

  @Get("all")
  async findall(): Promise<any[]> {
    return this.battleService.findall();
  }

  @Put("updatestatus/:id/:status")
  async updatestatus(@Param("id") id: string, @Param("status") status: string) {
    return this.battleService.updateBattleStatus(id, status);
  }

  @Get()
  async findallLive(
    @Headers("authorization") auth: string,
    @Query("CurrentPage") c: number,
    @Query("PageSize") size: number
  ): Promise<any> {
    const a = this.battleService.getLiveBattle(auth, c, size);
    const s = await this.battleService.findallwithLive();
    return (await a).toPromise().then(async (d) => {
      await d.Results.forEach((element: any, key: number) => {
        const dataset: any = s.filter((res) => {
          // console.log(res);
          return res.Battleid === d.Results[key].Id.toString();
        });
        if (dataset[0]) {
          d.Results[key].vj1score = dataset[0].vj1_score;
          d.Results[key].vj2score = dataset[0].vj2_score;
        } else {
          d.Results[key].vj1score = 0;
          d.Results[key].vj2score = 0;
        }
        d.Results[key].startTimetimestamp = Math.floor(
          new Date(d.Results[key].StartTime).getTime() / 100
        );
      });
      return await d;
    });
  }
}
