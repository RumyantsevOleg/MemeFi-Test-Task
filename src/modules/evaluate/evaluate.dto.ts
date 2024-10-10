export class EvaluateDto {
  expression: string;
}

export class EvaluateResponse {
  result?: number;
  errorMessage?: string;
}
