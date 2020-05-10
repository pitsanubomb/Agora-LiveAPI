import { Observable } from "rxjs";
import {
  Injectable,
  HttpService,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { map } from "rxjs/internal/operators/map";
import { AxiosResponse } from "axios";
@Injectable()
export class AgoraService {
  constructor(private readonly httpService: HttpService) {}
  postData(path: string): Observable<AxiosResponse<any>> {
    try {
      return this.httpService
        .post(`https://api.ccutelive.com/api/v1/Agora/${path}`)
        .pipe(
          map((res) => {
            return res.data;
          })
        );
    } catch (error) {
      throw new HttpException(
        {
          message: "ไม่สามารถติดต่อกับ Server ได้",
          errror: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
