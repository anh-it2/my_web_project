import axios from "axios";
import { SubmittedProblem } from "./type";

export async function getListSubmittedProblem(): Promise<SubmittedProblem[]> {
  const res = await axios.get(
    "https://686e2031c9090c49538860be.mockapi.io/problem"
  );
  return res.data || null;
}
