type UpdateProblem = {
  title: string;
  description: string;
  constraints: string;
  difficultyLevel: string;
  timeLimit: number; // milliseconds
  memoryLimit: number; // MB
  sampleInput: string;
  sampleOutput: string;
};
