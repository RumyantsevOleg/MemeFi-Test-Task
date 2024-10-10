import { Injectable } from "@nestjs/common";
import { CalculatorWorker } from "./workerPool";

@Injectable()
export class CalculateService {
  private calculatorWorker: CalculatorWorker;

  constructor() {
    // Todo this can be improved with DI and etc...
    this.calculatorWorker = new CalculatorWorker(1);
  }

  public async calculate(expression: any) {
    const res = await this.calculatorWorker.runTask(expression);
    console.log("res >> ", res);

    return res;
  }
}
