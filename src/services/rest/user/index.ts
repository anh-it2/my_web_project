import { UserProfileFormValues } from "@/hook/user-info/useUserInfoSchema";
import axios from "axios";
import { BASE_URL, FilterOptions } from "../constant";
import { ListUserResponse, UpdateRoleRequest } from "./type";


export async function getUserInfor(userName:string) {
  try {
    const res = await axios.post('/api/get-list',{
      link: `${BASE_URL}/user/${userName}`
    });
    return res.data;
  } catch (error) {
    console.error("Get user info API error:", error);
    return null;
  }
}

export async function getListUser(filter: FilterOptions): Promise<ListUserResponse> {
  try {
    const res = await axios.post('/api/get-list',{
      link: `${BASE_URL}/user?page=${filter.pageNumber}&pageSize=${filter.pageSize}`,
    });
    return res.data;
  } catch (error) {
    console.error("Get user info API error:", error);
    return {} as ListUserResponse;
  }
}

export async function updateUserInfo(payload: UserProfileFormValues) {
  try {
    const res = await axios.post('/api/post', {
      link: `${BASE_URL}/user/profile`,
      payload,
    });
    return res.data;
  } catch (error) {
    console.error("Update user API error:", error);
    return null;
  }
}

export async function updateRole(payload: UpdateRoleRequest) {
  try {
    const res = await axios.post('/api/update', {
      link: `${BASE_URL}/user/manage`,
      payload,
    });
    return res.data;
  } catch (error) {
    console.error("Update user API error:", error);
    return null;
  }
}
