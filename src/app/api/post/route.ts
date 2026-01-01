import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {link, payload} = await request.json();
    const jwtToken = request.cookies.get('jwtToken')

    try {
        const res = await axios.post(`${link}`, payload, {
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