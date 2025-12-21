import axios from "axios";
import { MyProblem } from "./type";

export async function getListProblem(): Promise<MyProblem[]> {
  // const res = await axios.get(
  //   "https://686e2031c9090c49538860be.mockapi.io/activeProblem"
  // );
  const res = await axios.get("/api/problem/get-my-problem");
  return res.data;
}
