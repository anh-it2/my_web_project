import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {id, link} = await request.json();
    const jwtToken = request.cookies.get('jwtToken')

    try {
        if(id){
            const res = await axios.delete(`${link}/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken?.value}`,
                },
            });
        
            return NextResponse.json(res.data, { status: 200 });
        }

        const res = await axios.delete(`${link}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken?.value}`,
                },
            });
        
            return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: `Have an error: ${error}` },
            { status: 500 }
        );
    }
}   