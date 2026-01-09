import axios, { AxiosError } from "axios";
import { BASE_URL, InsertUpdateResponse } from "../../constant";
import { TestCase } from "../get-test-case/type";

export async function updateTestCase(data: TestCase): Promise<InsertUpdateResponse<any>>{

    const {testcaseId, ...payload} = data;

    try {
        const res = await axios.post(`${window.location.origin}/api/update`, {
            link: `${BASE_URL}/testcases/${testcaseId}`,
           payload
        });
    
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