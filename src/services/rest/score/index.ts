import axios from "axios";
import { BASE_URL } from "../constant";


export async function getClassScore(adminId: string): Promise<number> {
  const res = await axios.post(`${window.location.origin}/api/get-list`, {
    link: `${BASE_URL}/score/${adminId}`,
  });
  if (!res.data) return 0;
return res.data
}
