import { Controller, Get, Param, Header, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { BattlesService } from "./battles.service";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();
@Controller("battles")
export class BattlesController {
  constructor(private readonly battleService: BattlesService) {}
  @Header("Content-Type", "text/event-stream")
  @Header("Connection", "keep-alive")
  @Header("Cache-Control", "no-cache")
  @Get(":id")
  findId(@Res() res: Response, @Param("id") id: string) {
    eventEmitter.on(id, data => {
      res.write('data: {"msg": ' + data + "}\n\n");
    });
    res.write("");
  }

  @Post(":id")
  post(@Param("id") id: string) {
    eventEmitter.emit(id, id);
  }

  @Get()
  async findall():Promise<any[]>
  {
    return this.battleService.findall();
  }
}
