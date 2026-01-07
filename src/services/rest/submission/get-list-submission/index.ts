import axios from "axios";
import { BASE_URL, FilterOptions } from "../../constant";
import { ListSubmissionResponse } from "./type";

export async function getListSubmission(filter: FilterOptions, problemId: string): Promise<ListSubmissionResponse> {
  const res = await axios.post(
    '/api/get-list', {
      link: `${BASE_URL}/submissions/user/problem/${problemId}?page=${filter.pageNumber}&pageSize=${filter.pageSize}`,
      filter
    }
  );
  return res.data || null;
}
