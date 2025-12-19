import axios from "axios";

export async function registerAccount(payload: RegisterTypes) {
  try {
    const res = await axios.post("/api/register", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Register API error:",
        error.response?.status,
        error.response?.data
      );
      return error.response?.data; // contains status + backend message from route.ts
    }
    console.error("Register API unknown error:", error);
    return null;
  }
}

export async function loginAccount(payload: LoginTypes) {
  try {
    const res = await axios.post("/api/login", payload);
    return res.data;
  } catch (error) {
    console.error("Login API error:", error);
    return null;
  }
}
