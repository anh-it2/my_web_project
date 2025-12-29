export type ProblemStatus = "draft" | "published";

export type ProblemDetail = {
  problemId: number;
  problemCode: string;
  title: string;
  description: string;
  inputFormat: string | null;
  outputFormat: string | null;
  sampleInput: string | null;
  sampleOutput: string | null;
  constraints: string;
  difficultyLevel: string;
  timeLimit: number; // ms
  memoryLimit: number; // MB
  createdBy: string;
  createdDate: string; // ISO string
  updatedDate: string; // ISO string
  active: boolean;
  // Optional fields that might be added by frontend
  maxScore?: number;
};
