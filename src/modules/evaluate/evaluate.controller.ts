import { Controller } from "@nestjs/common";
import { EvaluateService } from "./evaluate.service";
import { TypedBody, TypedRoute } from "@nestia/core";
import { EvaluateDto, EvaluateResponse } from "./evaluate.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("evaluate")
@Controller("evaluate")
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @TypedRoute.Post("/")
  public evaluate(@TypedBody() body: EvaluateDto): EvaluateResponse {
    try {
      const result = this.evaluateService.evaluate(body.expression);

      return { result };
    } catch (err) {
      // Todo implement logger
      console.log(err);
      return { errorMessage: err.message };
    }
  }
}
