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
  public async evaluate(
    @TypedBody() body: EvaluateDto,
  ): Promise<EvaluateResponse> {
    try {
      return await this.evaluateService.evaluate(body.expression);
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message };
    }
  }
}
