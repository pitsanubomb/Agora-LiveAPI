import { Controller, Get, Param, Put } from "@nestjs/common";
import { BattlesService } from "./battles.service";

@Controller("battles")
export class BattlesController {
  constructor(private readonly battleService: BattlesService) {}

  @Get()
  async findall(): Promise<any[]> {
    return this.battleService.findall();
  }

  @Put("updatestatus/:id/:status")
  async updatestatus(@Param("id") id: string, @Param("status") status: string) {
    return this.battleService.updateBattleStatus(id, status);
  }
}
