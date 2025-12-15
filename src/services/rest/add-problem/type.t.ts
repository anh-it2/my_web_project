export type ProblemFormValues = {
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  visibility: boolean;
  timeLimit: number;
  memoryLimit: number;
  description: string;
  samples: { input: string; output: string }[];
  testCases: { input: string; output: string; score: number }[];
};

export type Testcase = {
  id: string;
  input: string;
  output: string;
  weight: number;
  visibility: "PUBLIC" | "HIDDEN";
  isSample: boolean;
};
