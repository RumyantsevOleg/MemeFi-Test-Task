import { Controller } from "@nestjs/common";
import { EvaluateService } from "./evaluate.service";
import { TypedBody, TypedRoute } from "@nestia/core";
import { EvaluateDto } from "./evaluate.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("evaluate")
@Controller("evaluate")
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @TypedRoute.Post("/")
  public evaluate(@TypedBody() body: EvaluateDto) {
    return this.evaluateService.evaluate(body.expression);
  }
}
