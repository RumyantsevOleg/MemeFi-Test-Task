import { Inject, Injectable } from "@nestjs/common";
import {
  MESSAGE_PATTERNS,
  QUEUE_INFO,
} from "../../common/constants/common.constants";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class EvaluateService {
  constructor(
    @Inject(QUEUE_INFO.serviceName)
    private readonly queueClient: ClientProxy, // rabbitMq client
  ) {}

  public async evaluate(expression: string): Promise<number> {
    const result = await lastValueFrom(
      this.queueClient.send(
        MESSAGE_PATTERNS.workerMessagePattern,
        JSON.stringify(expression),
      ),
    );

    // Response from the worker
    return result;
  }
}
