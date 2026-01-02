import axios from "axios";
import { BASE_URL } from "../../constant";
import { CreateTestCasePayload } from "./type";

export async function addTestCase(problemId: number, payload: CreateTestCasePayload) {

  const res = await axios.post('/api/post', {
    link: `${BASE_URL}/testcases/problem/${problemId}`,
    payload,
  })

  return res.data;
}
