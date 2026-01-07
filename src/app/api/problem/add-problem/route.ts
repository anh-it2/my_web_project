import { BASE_URL } from "@/services/rest/constant";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const jwtToken = req.cookies.get("jwtToken");

  try {
    const res = await axios.post(`${BASE_URL}/problems`, payload, {
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
