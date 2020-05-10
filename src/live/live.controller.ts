import { AgoraService } from "./../core/agora.service";
import { response } from "express";
import { LiveService } from "./live.service";
import { Post, Controller, Body, Headers } from "@nestjs/common";

@Controller("lives")
export class LiveController {
  constructor(
    private readonly liveService: LiveService,
    private readonly agora: AgoraService
  ) {}

  @Post()
  async createLive(@Body() body: any, @Headers("authorization") auth: string) {
    const Response = await this.liveService
      .createLive(body, auth)
      .toPromise()
      .then((res) => res);
    const Agoratoken = await this.agora
      .postData(
        "createTokenChannel/0f12cb689dc14466a4ae2d054df077ff/30768b33a70941e4b5822b176416b7a1/" +
          body.ChannelId +
          "/" +
          body.UserId +
          "/1440"
      )
      .toPromise()
      .then((res) => res);
    return { Response, Agoratoken };
  }
}
