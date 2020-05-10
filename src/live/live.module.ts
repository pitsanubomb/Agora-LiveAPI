import { LiveController } from './live.controller';
import { AgoraService } from './../core/agora.service';
import { LiveService } from './live.service';
import { Module, HttpModule } from "@nestjs/common";

@Module({
  imports: [
    HttpModule.register({
      headers: {
        "Content-Type": "application/json",
      },
    }),
  ],
  controllers: [LiveController],
  providers: [LiveService,AgoraService],
})
export class LiveModule {}
