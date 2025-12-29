import axios from "axios";

export async function deleteProblem(id: number, link: string) {
    try {
        const res = await axios.post('/api/delete', {id, link})
        return res.data
    } catch (error) {
        return  error
    }
}