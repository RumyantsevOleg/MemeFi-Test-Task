import { parentPort } from "worker_threads";

parentPort?.on("message", (expression) => {
  try {
    let tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) {
      throw new Error("Invalid expression: Unable to tokenize input");
    }

    let numbersStack: number[] = [];
    let operations: string[] = [];

    const precedence = (op: string): number => {
      if (op === "+" || op === "-") return 1;
      if (op === "*" || op === "/") return 2;
      return 0;
    };

    const applyOperation = (op: string, b: number, a: number): number => {
      if (op === "/" && b === 0) {
        throw new Error("Division by zero error");
      }
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
        default:
          throw new Error("Unknown operator");
      }
    };

    const evaluate = () => {
      const b = numbersStack.pop();
      const a = numbersStack.pop();
      const op = operations.pop();
      if (b === undefined || a === undefined || op === undefined) {
        throw new Error(
          "Invalid expression during evaluation: Missing operands or operator",
        );
      }
      const result = applyOperation(op, b, a);
      if (!isFinite(result)) {
        throw new Error("Result is Infinity or NaN");
      }
      numbersStack.push(result);
    };

    for (let token of tokens) {
      if (/\d+(\.\d+)?/.test(token)) {
        // Push numbers directly into the stack
        numbersStack.push(Number(token));
      } else if (token === "(") {
        operations.push(token);
      } else if (token === ")") {
        // Pop operations until matching opening parenthesis
        while (operations.length && operations[operations.length - 1] !== "(") {
          evaluate();
        }
        operations.pop();
      } else {
        // Handle operators with respect to precedence
        while (
          operations.length &&
          precedence(operations[operations.length - 1]) >= precedence(token)
        ) {
          evaluate();
        }
        operations.push(token);
      }
    }

    // Evaluate the remaining operations in the stack
    while (operations.length) {
      evaluate();
    }
    if (numbersStack.length !== 1) {
      throw new Error("Invalid expression: Too many operands or operators");
    }

    // Todo Is it enough to solve problem with floating-point arithmetic errors
    const result = Number(numbersStack[0].toFixed(15));

    parentPort?.postMessage({ result });
  } catch (error) {
    parentPort?.postMessage({ error: error.message });
  }
});
