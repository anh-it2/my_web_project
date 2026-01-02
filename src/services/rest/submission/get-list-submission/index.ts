import axios from "axios";
import { FilterOptions } from "../../constant";
import { Submission } from "../type";

export async function getListSubmission(filter: FilterOptions, problemId: string): Promise<Submission[]> {
  const res = await axios.post(
    '/api/get-list', {
      link: `http://localhost:8080/submissions/${problemId}?page=${filter.pageNumber}&pageSize=${filter.pageSize}`,
      filter
    }
  );
  return res.data || null;
}
