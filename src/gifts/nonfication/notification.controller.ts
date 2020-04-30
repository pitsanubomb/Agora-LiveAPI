import { Firebase } from "./../../core/firebase.service";
import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Controller("nontification")
export class NontificationController {
  constructor(private readonly firebaseAdmin: Firebase) {}

  @Post()
  async sendNontificaion(@Body() message: any) {
    const type: string = typeof message.token;
    if (type === "string") {
      console.log("Dothis . .");
      await this.firebaseAdmin.firebaseSendMassage(message);
      return { message: `Send nontification success`, data: message.data };
    } else if (type === "object") {
      let tempArray = [];
      message.token.forEach((element: string) => {
        tempArray.push(element);
      });
      if (tempArray.length > 0) {
        const body = {
          data: message.data,
          tokens: tempArray,
        };
        const res = await this.firebaseAdmin.firebaseSendMassageMulti(body);
        return {
          message: `Send nontification`,
          data: message.data,
          firebase: res,
        };
      } else {
        throw new HttpException(
          {
            satatus: 201,
            message: "ไม่สามารถทำรายการได้",
          },
          HttpStatus.CREATED
        );
      }
    } else {
      throw new HttpException(
        {
          status: 201,
          message: "ส่งข้อมูลมาผิดรูปแบบ กรุณาส่งใหม่",
        },
        HttpStatus.CREATED
      );
    }
  }
}
