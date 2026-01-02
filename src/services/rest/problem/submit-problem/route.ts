import axios from "axios";
import { BASE_URL } from "../../constant";
import { SubmitProblemPayload } from "./type";

export async function submitProblem(payload:SubmitProblemPayload) {
    const res = await axios.post('/api/post', {
        link: `${BASE_URL}/submissions`, 
        payload
    })
    return res.data
}