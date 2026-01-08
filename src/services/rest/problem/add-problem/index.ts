import axios, { AxiosError } from "axios";

type AddProblemResult =
  | { ok: true; data: any }
  | { ok: false; status: number; message: string; data: any };

export async function addProblem(
  payload: CreateProblem
): Promise<AddProblemResult> {
  try {
    const res = await axios.post(
      "/api/problem/add-problem",
      payload
    );

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
