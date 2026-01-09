import axios, { AxiosError } from "axios";
import { InsertUpdateResponse } from "../../constant";

export async function addProblem(
  payload: CreateProblem
): Promise<InsertUpdateResponse<any>> {
  try {
    const res = await axios.post("/api/problem/add-problem", payload);

    return { ok: true, data: res.data };
  } catch (error) {
    const err = error as AxiosError<any>;

    return {
      ok: false,
      status: err.response?.status || 500,
      message: err.response?.data?.message || "Error",
      data: err.response?.data,
    };
  }
}
