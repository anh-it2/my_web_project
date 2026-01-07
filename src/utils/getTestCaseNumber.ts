import { TestCase } from "@/services/rest/test-case/get-test-case/type";

export const getTestCaseNumber = (testcase?: TestCase[]): number => {
    if(!testcase) return 0;
    return testcase.filter((item) => !item.sample).length;
}