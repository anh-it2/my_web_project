export interface PerTestResults {
  testCaseId: number;
  status: string;
  runtime: number;
  memory: number;
}

export interface Submission {
  errorMessage: string;
  executionTime: number | null;
  judgedAt: string;        
  language: string;
  memoryUsed: number | null;
  passedTestcases: number;
  problemCode: string;
  problemTitle: string;
  status: string;
  submissionId: number;
  submittedAt: string; 
  totalTestcases: number;
  username: string;
  code: string;
}
