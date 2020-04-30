import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class Firebase {
  constructor() {}
  onModuleInit() {
    this.firebaseInit();
    console.log(`The Firebase  has been initialized.`);
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
}
