import axios from "axios";
import { CreateTestCase } from "./type";

export async function addTestCase(problemId: number, payload: CreateTestCase[]) {
  const res = await axios.post("/api/test-case/add-test-case", {
    problemId,
    payload,
  });

  return res.data;
}
