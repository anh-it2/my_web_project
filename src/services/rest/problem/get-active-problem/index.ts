import axios from "axios";
import { FilterOptions } from "../../constant";
import { ProblemResponse } from "./type";

export async function getListActiveProblem(filter: FilterOptions): Promise<ProblemResponse> {
  const res = await axios.post("/api/get-list", {
    link: `http://localhost:8080/problems?page=${filter?.pageNumber}&pageSize=${filter?.pageSize}`,
  });

  if (!res.data.content) return {} as ProblemResponse;

  return {...res.data, content: res.data.content.map((item: ProblemResponse) => ({
    ...item,
    maxScore: 100,
  }))};
}
