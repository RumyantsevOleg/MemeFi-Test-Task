import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { MESSAGE_PATTERNS } from "../../common/constants/common.constants";
import { CalculateService } from "./calculate.service";

@Controller("calculate")
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @MessagePattern(MESSAGE_PATTERNS.workerMessagePattern)
  public calculate(data: any) {
    return this.calculateService.calculate(data);
  }
}
