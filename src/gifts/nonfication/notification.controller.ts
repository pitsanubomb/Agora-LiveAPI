import { Firebase } from "./../../core/firebase.service";
import { Controller, Body, Post } from "@nestjs/common";

@Controller("nontification")
export class NontificationController {
  constructor(private readonly firebaseAdmin: Firebase) {}

  @Post()
  async sendNontificaion(@Body() message: any) {
    return await this.firebaseAdmin.firebaseSendMassage(message);
  }
}
