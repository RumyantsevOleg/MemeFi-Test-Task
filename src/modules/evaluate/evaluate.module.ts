import { Module } from "@nestjs/common";
import { EvaluateService } from "./evaluate.service";
import { EvaluateController } from "./evaluate.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { QUEUE_INFO } from "../../common/constants/common.constants";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: QUEUE_INFO.serviceName,
        transport: Transport.RMQ,
        options: {
          urls: [QUEUE_INFO.url],
          queue: QUEUE_INFO.queueName,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [EvaluateController],
  providers: [EvaluateService],
})
export class EvaluateModule {}
