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
import { GiftsList } from "./dto/giftlist.dto";
import { EventEmitter } from "events";
import { CommandBus } from "@nestjs/cqrs";
import { SendGiftCommand } from "./command/impl/sendgift.command";

const ev = new EventEmitter();
@Controller("gifts")
export class GiftController {
  constructor(
    private readonly giftService: GiftSerivce,
    private readonly commandBus: CommandBus
  ) {}

  @Post("battle/:id")
  async addgift(
    @Param("id") id: string,
    @Body() body: GiftsList
  ): Promise<any> {
    return await this.commandBus.execute(new SendGiftCommand(id, body));
    // ev.emit(id, res);
  }

  @Header("Content-Type", "text/event-stream")
  @Header("Connection", "keep-alive")
  @Header("Cache-Control", "no-cache")
  @Get("battle/:id")
  findId(@Res() res: Response, @Param("id") id: string) {
    ev.on(id, (data) => {
      let body = data.giftlist;
      res.write(`data:${JSON.stringify(body)}\n\n`);
    });
    res.write("");
  }

  @Delete("all")
  async clearall(): Promise<any> {
    return await this.giftService.clearAll();
  }
}
