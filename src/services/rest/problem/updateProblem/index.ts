import axios from "axios";
import { BASE_URL } from "../../constant";

export async function updateProblem(payload: UpdateProblem, problemId: string) {
  const res = await axios.post(
    `${window.location.origin}/api/update`,
    {
      link: `${BASE_URL}/problems/${problemId}`,
      payload
    }
  );
  return res.data;
}
