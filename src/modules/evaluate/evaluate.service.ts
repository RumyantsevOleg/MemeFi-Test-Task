import { Injectable } from "@nestjs/common";

@Injectable()
export class EvaluateService {
  public evaluate(expression: string): string {
    return "2 + 2 = 4";
  }
}
