export interface SubmittedProblem {
  submissionId: number;
  problemTitle: string;
  language: string;
  status: string;
  passedTestcases: number;
  totalTestcases: number;
  judgedAt?: string; // ISO 8601 datetime
}

export interface SubmittedProblemResponse {
  content: SubmittedProblem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
