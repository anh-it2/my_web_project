import axios from "axios";

export async function getProblemDetail(id: string): Promise<ProblemDetail> {
  const res = await axios.get(
    "https://686e2031c9090c49538860be.mockapi.io/activeProblem"
  );
  return res.data[id] || null;
}
