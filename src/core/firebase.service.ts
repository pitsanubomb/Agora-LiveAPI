import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class Firebase {
  constructor() {}
  onModuleInit() {
    this.firebaseInit();
  }

  async firebaseInit() {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  async firebaseSendMassage(FirebaseMessage: any) {
    return await admin
      .messaging()
      .send(FirebaseMessage)
      .then((res) => res)
      .catch((error) => {
        throw new HttpException(
          {
            message: "ไม่สามารถทำรายการได้ : " + error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  async firebaseSendMassageMulti(FirebaseMessage: any) {
    return await admin
      .messaging()
      .sendMulticast(FirebaseMessage)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new HttpException(
          {
            message: "ไม่สามารถทำรายการได้ : " + error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
