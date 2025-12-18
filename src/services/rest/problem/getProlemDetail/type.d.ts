export type ProblemStatus = "draft" | "published";
export type ProblemDifficulty = "easy" | "medium" | "hard";

export type ProblemDetail = {
  id: string;
  title: string;
  slug: string;
  statement: string; // markdown or html
  difficulty: ProblemDifficulty;
  tags: string[];
  time_limit: number; // ms
  memory_limit: number; // MB
  visibility: boolean;
  creator_id: string;
  status: ProblemStatus;
  created_at: string; // ISO string
  updated_at: string; // ISO string
};
