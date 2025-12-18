import axios from "axios";
import { TestCase } from "./type";

export async function getListTestCaseForProblem(
  id: string
): Promise<TestCase[]> {
  const res = await axios.get(
    "https://68e76d9d10e3f82fbf3f1732.mockapi.io/list-test-case"
  );
  return res.data || null;
}
