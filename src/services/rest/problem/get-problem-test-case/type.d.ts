export interface Testcase {
  testcaseId: number;
  input: string;
  expectedOutput: string;
  orderIndex: number;
  sample: boolean;
}
