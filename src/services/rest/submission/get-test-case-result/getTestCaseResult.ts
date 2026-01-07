import axios from "axios";
import { BASE_URL } from "../../constant";

export async function getListTestCaseResult(submissionId: string): Promise<TestCaseResult[]> {
  const res = await axios.post(
    '/api/get-list', {
      link: `${BASE_URL}/submissions/user/problem/${submissionId}`,
    }
  );
  return res.data || null;
}
