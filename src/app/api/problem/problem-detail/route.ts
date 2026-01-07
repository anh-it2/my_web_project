import { BASE_URL } from "@/services/rest/constant";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jwtToken = req.cookies.get("jwtToken");
  const { id } = await req.json();

  try {
    const res = await axios.get(`${BASE_URL}/problems/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken?.value}`,
      },
    });

    const data = { 
      ...res.data, 
      maxScore: 100 
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Have an error: ${error}` },
      { status: 500 }
    );
  }
}
