export type ProblemFormValues = {
  title: string;
  problemCode: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  visibility: boolean;
  timeLimit: number;
  memoryLimit: number;
  description: string;
  samples: {
    input: string;
    expectedOutput: string;
    orderIndex: number;
    score: number;
    isSample: boolean;
  }[];
  testCases: {
    input: string;
    expectedOutput: string;
    score: number;
    orderIndex: number;
    isSample: boolean;
  }[];
  constraints: string;
};
