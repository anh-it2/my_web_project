import axios from "axios";
import { ActiveProblem } from "./type";

export async function getListActiveProblem(link: string): Promise<ActiveProblem[]> {
  const res = await axios.post("/api/get-list", {
    link,
  });
   res.data = !res.data ? [] : Array.isArray(res.data) ? res.data : [res.data];
  
  return res.data.map((item: ActiveProblem) => ({
    ...item,
    maxScore: 100,
  }));
}
