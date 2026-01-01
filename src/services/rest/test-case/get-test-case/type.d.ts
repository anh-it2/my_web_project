export type TestCase = {
  testcaseId: number;
  input: string;
  expectedOutput: string;
  orderIndex: number;
  sample: boolean;
};

export type ListTestCaseResponse = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  content: TestCase[];
};