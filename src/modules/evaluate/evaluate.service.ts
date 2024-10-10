import { Inject, Injectable } from "@nestjs/common";
import {
  MESSAGE_PATTERNS,
  QUEUE_INFO,
} from "../../common/constants/common.constants";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class EvaluateService {
  constructor(
    @Inject(QUEUE_INFO.serviceName)
    private readonly queueClient: ClientProxy, // rabbitMq client
  ) {}

  public async evaluate(expression: string): Promise<number> {
    const result = await this.queueClient.emit(
      MESSAGE_PATTERNS.workerMessagePattern,
      JSON.stringify(expression),
    );
    console.log("result", JSON.stringify(result));

    return 777;
  }
}
