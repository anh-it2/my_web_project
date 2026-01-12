import axios from "axios";
import { BASE_URL, FilterOptions } from "../../constant";
import { SubmittedProblemResponse } from "./type";

export async function getListSubmittedProblem(adminId: string, filter: FilterOptions): Promise<SubmittedProblemResponse> {
   const res = await axios.post("/api/get-list", {
    link: `${BASE_URL}/submissions/user/${adminId}?page=${filter?.pageNumber}&pageSize=${filter?.pageSize}`,
  });
  return res.data || null;
}
