interface ProblemDetail {
  problemId: number;
  problemCode: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  difficultyLevel: string;
  timeLimit: number;
  memoryLimit: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
}
