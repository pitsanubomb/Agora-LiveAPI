import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Header,
  Res,
  Delete,
} from "@nestjs/common";
import { Response } from "express";
import { GiftSerivce } from "./gifts.service";
import { EventEmitter } from "events";
import { CommandBus } from "@nestjs/cqrs";
import { SendGiftCommand } from "./command/impl/sendgift.command";
import { GenUidService } from "src/core/genuid.service";
import { Gifts } from "./entity/gifts.entity";

const ev = new EventEmitter();
@Controller("gifts")
export class GiftController {
  constructor(
    private readonly giftService: GiftSerivce,
    private readonly commandBus: CommandBus,
    private readonly genUid: GenUidService
  ) {}

  @Post("battle/:id")
  async addgift(@Param("id") id: string, @Body() body: Gifts): Promise<any> {
    const res: any = body;
    res.transectionid = this.genUid.genUid();
    await this.commandBus.execute(new SendGiftCommand(id, res));
    const battle = await this.giftService.updateScore(
      body.vjid,
      id,
      body.expvj
    );
    res.vj1score = battle.vj1_score;
    res.vj2score = battle.vj2_score;
    res.vj1scorebar = Math.round(
      (battle.vj1_score / (battle.vj1_score + battle.vj2_score)) * 100
    );
    res.vj2scorebar = Math.round(
      (battle.vj2_score / (battle.vj1_score + battle.vj2_score)) * 100
    );
    ev.emit(id, res);
    return res;
  }

  @Header("Content-Type", "text/event-stream")
  @Header("Connection", "keep-alive")
  @Header("Cache-Control", "default")
  @Get("battle/:id/score")
  async getScore(@Res() res: Response, @Param("id") id: string): Promise<any> {
    ev.on(id, (data) => {
      const body = {
        vj1score: data.vj1score,
        vj2score: data.vj2score,
        vj1scorebar: data.vj1scorebar,
        vj2scorebar: data.vj2scorebar,
      };
      res.write(`data:${JSON.stringify(body)}\n\n`);
    });
  }

  @Get("battle/:id")
  async getgift(@Param("id") id: string): Promise<any> {
    return await this.giftService.getGiftByBattleId(id);
  }

  @Delete("all")
  async clearall(): Promise<any> {
    return await this.giftService.clearAll();
  }
}
