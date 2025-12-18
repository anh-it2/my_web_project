export interface PerTestResults {
  testCaseId: number;
  status: string;
  runtime: number;
  memory: number;
}

export interface Submission {
  id: number;
  user_id: number;
  problem_id: number;
  code: string;
  language: string;
  status: string;
  score: number | null;
  runtime: number | null;
  memory: number | null;
  compile_output: string | null;
  per_test_results: PerTestResults[];
  created_at: string;
  isFinal: boolean;
}
