import { Module } from "@nestjs/common";
import { CalculateController } from "./calculate.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { QUEUE_INFO } from "../../common/constants/common.constants";
import { CalculateService } from "./calculate.service";

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
  controllers: [CalculateController],
  providers: [CalculateService],
})
export class CalculateModule {}
