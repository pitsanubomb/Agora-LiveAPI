import { AxiosResponse } from "axios";
import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";

@Injectable()
export class LiveService {
  constructor(
    private readonly http: HttpService
  ) {}

  createLive(body: any, auth: string): Observable<AxiosResponse<any>> {
    const header = {
      headers: {
        Authorization: auth,
      },
    };
    return this.http
      .post(`${process.env.BACK_END_API}/lives`, body, header)
      .pipe(
        map((res: any) => {
          let response = res.data;
          return response;
        })
      );
  }
}
