import { Inject, Injectable } from "@nestjs/common";
import {
  MESSAGE_PATTERNS,
  QUEUE_INFO,
} from "../../common/constants/common.constants";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { EvaluateResponse } from "./evaluate.dto";
import { IdentifierFactory } from "typia/lib/factories/IdentifierFactory";
import { assert } from "typia";

@Injectable()
export class EvaluateService {
  constructor(
    @Inject(QUEUE_INFO.serviceName)
    private readonly queueClient: ClientProxy, // rabbitMq client
  ) {}

  public async evaluate(expression: string): Promise<EvaluateResponse> {
    const response = await lastValueFrom(
      this.queueClient.send(MESSAGE_PATTERNS.workerMessagePattern, expression),
    );

    return assert<EvaluateResponse>(response);
  }
}
