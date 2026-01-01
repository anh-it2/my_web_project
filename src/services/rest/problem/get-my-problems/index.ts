import axios from "axios";
import { ProblemResponse } from "../get-active-problem/type";

import { FilterOptions } from "../../constant";

export async function getListProblem(filter?: FilterOptions): Promise<ProblemResponse> {
  const res = await axios.post(
    `${window.location.origin}/api/get-list`, {
      link: `http://localhost:8080/problems/me?page=${filter?.pageNumber}&pageSize=${filter?.pageSize}`,
    }
  );
  if (!res.data.content) return {} as ProblemResponse;

  return {...res.data, content: res.data.content.map((item: ProblemResponse) => ({
    ...item,
    maxScore: 100,
  }))};
}
