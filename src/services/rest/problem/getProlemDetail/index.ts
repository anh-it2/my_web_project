import axios from "axios";
import { ProblemDetail } from "./type";

export async function getProblemDetail(id: string): Promise<ProblemDetail> {
  const res = await axios.get(
    "https://694391e669b12460f3151313.mockapi.io/problemDetail"
  );
  return res.data[id] || null;
}
