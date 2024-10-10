import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { MESSAGE_PATTERNS } from "../../common/constants/common.constants";
import { CalculateService } from "./calculate.service";

@Controller("calculate")
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @MessagePattern(MESSAGE_PATTERNS.workerMessagePattern)
  public async calculate(data: any) {
    return await this.calculateService.calculate(data);
  }
}
