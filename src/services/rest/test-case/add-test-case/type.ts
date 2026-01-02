export type CreateTestCase = {
  input: string;
  expectedOutput: string;
  isSample: boolean;
  orderIndex: number;
};

export type CreateTestCasePayload = {
  testcases: CreateTestCase[];
};
