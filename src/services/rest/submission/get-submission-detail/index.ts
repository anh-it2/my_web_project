import axios from "axios";
import { BASE_URL } from "../../constant";
import { Submission } from "../type";

export async function getSubmissionDetail(id: string): Promise<Submission> {
  const res = await axios.post(
    `${window.location.origin}/api/get-list`,{
      link: `${BASE_URL}/submissions/${id}`
    }
  );
  return res.data || null;
}