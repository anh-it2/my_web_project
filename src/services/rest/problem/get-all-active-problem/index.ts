import axios from "axios";
import { ActiveProblem } from "./type";

export async function getActiveProblem(): Promise<ActiveProblem[]> {
  const res = await axios.get(
    "https://686e2031c9090c49538860be.mockapi.io/activeProblem"
  );
  return res.data || null;
}
