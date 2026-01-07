import axios from "axios";
import { BASE_URL } from "../constant";

export async function registerAccount(payload: RegisterTypes) {
  try {
    const res = await axios.post("/api/auth/register", payload);
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
    const res = await axios.post("/api/auth/login", payload);
    return res.data;
  } catch (error) {
    console.error("Login API error:", error);
    return null;
  }
}

export async function logoutAccount() {
  try {
    const res = await axios.post('/api/auth/logout');
    return res.data;
  } catch (error) {
    console.error("Logout API error:", error);
    return null;
  }
}

export async function deleteAccount(userName:string) {
  try {
    const res = await axios.post('/api/delete', {
      link: `${BASE_URL}/user/${userName}`,
    });
    return res.data;
  } catch (error) {
    console.error("Delete user API error:", error);
    return null;
  }
}
