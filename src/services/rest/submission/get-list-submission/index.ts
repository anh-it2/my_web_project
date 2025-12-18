import axios from "axios";
import { Submission } from "../type";

export async function getListSubmission(): Promise<Submission[]> {
  const res = await axios.get(
    "https://694391e669b12460f3151313.mockapi.io/submittedAssign"
  );
  return res.data || null;
}
