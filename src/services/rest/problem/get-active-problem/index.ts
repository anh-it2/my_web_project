import axios from "axios";
import { BASE_URL, FilterOptions } from "../../constant";
import { ProblemResponse } from "./type";

export async function getListActiveProblem(filter: FilterOptions): Promise<ProblemResponse> {
  const res = await axios.post("/api/get-list", {
    link: `${BASE_URL}/problems?page=${filter?.pageNumber}&pageSize=${filter?.pageSize}`,
  });

  if (!res.data.content) return {} as ProblemResponse;

  return {...res.data, content: res.data.content.map((item: ProblemResponse) => ({
    ...item,
    maxScore: 100,
  }))};
}
