import { BASE_URL, FilterOptions } from "@/services/rest/constant";
import axios from "axios";
import { ListTestCaseResponse } from "./type";

export async function getListTestCaseForProblem(
  id: string,
  filter: FilterOptions
): Promise<ListTestCaseResponse> {
  const res = await axios.post(
    `${window.location.origin}/api/get-list`,
    { link: `${BASE_URL}/problems/${id}/testcases?page=${filter.pageNumber}&pageSize=${filter.pageSize}`}
  );
  return res.data || null;
}
