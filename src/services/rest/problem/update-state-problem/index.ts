import axios from "axios";

export async function updateStateProblem(problemId: number) {
  const res = await axios.put("/api/problem/update-state-problem", problemId);
  return res.data;
}
