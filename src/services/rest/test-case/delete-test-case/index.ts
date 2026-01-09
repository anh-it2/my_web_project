import axios from "axios";
import { BASE_URL } from "../../constant";

export async function deleteTestCase(id: number) {
  try {
    const res = await axios.post("/api/delete", { link: `${BASE_URL}/testcases/${id}` });
    return res.data;
  } catch (error) {
    return error;
  }
}
