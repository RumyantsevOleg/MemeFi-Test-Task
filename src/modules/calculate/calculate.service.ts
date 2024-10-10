import { Injectable } from "@nestjs/common";
import { CalculatorWorker } from "./workerPool";
import { cpus } from "node:os";

@Injectable()
export class CalculateService {
  private calculatorWorker: CalculatorWorker;

  constructor() {
    // Todo this can be improved with DI and etc...
    const numCPUs = cpus().length > 1 ? cpus().length - 1 : 1;
    this.calculatorWorker = new CalculatorWorker(numCPUs);
  }

  public async calculate(expression: any) {
    try {
      const result = await this.calculatorWorker.runTask(expression);
      return { result };
    } catch (err) {
      return { errorMessage: err.message };
    }
  }
}
