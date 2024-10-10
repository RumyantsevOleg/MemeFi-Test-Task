import { Worker } from "worker_threads";
import { join } from "path";

export class CalculatorWorker {
  private workers: Worker[] = [];
  private availableWorkers: Worker[] = [];
  private taskQueue: {
    expression: string;
    resolve: (value: number) => void;
    reject: (reason?: any) => void;
  }[] = [];

  constructor(pullSize: number) {
    for (let i = 0; i < pullSize; i++) {
      this.createWorker();
    }
  }

  private createWorker() {
    const worker = new Worker(join(__dirname, "calculate.worker.js"));
    worker.on("message", (message) => this.handleResult(worker, message));
    worker.on("error", (error) => this.handleError(worker, error));
    worker.on("exit", (code) => this.handleExit(worker, code));
    this.workers.push(worker);
    this.availableWorkers.push(worker);
  }

  private handleResult(worker: Worker, message: any) {
    const task = this.taskQueue.shift();
    if (task) {
      if (message.error) {
        task.reject(new Error(message.error));
      } else {
        task.resolve(message.result);
      }
    }
    this.availableWorkers.push(worker);
    this.runNextTask();
  }

  private handleError(worker: Worker, error: any) {
    const task = this.taskQueue.shift();
    if (task) {
      task.reject(error);
    }
    this.availableWorkers.push(worker);
    this.runNextTask();
  }

  private handleExit(worker: Worker, code: number) {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
    this.workers = this.workers.filter((w) => w !== worker);
    this.availableWorkers = this.availableWorkers.filter((w) => w !== worker);
    this.createWorker();
  }

  private runNextTask() {
    if (this.availableWorkers.length > 0 && this.taskQueue.length > 0) {
      const worker = this.availableWorkers.pop();
      const task = this.taskQueue[0];
      if (worker) {
        worker.postMessage(task.expression);
      }
    }
  }

  public runTask(expression: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ expression, resolve, reject });
      this.runNextTask();
    });
  }
}
