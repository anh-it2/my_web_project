type TestCaseResult = {
  testcaseNumber: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  timeTaken: number;
  memoryUsed: number;
  status: string;
  passed: boolean;
};
