import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const jwtToken = req.cookies.get("jwtToken");

  const problemId = await req.json();

  try {
    const res = await axios.put(
      `http://localhost:8080/problems/active/${problemId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwtToken?.value}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Have an error: ${error}` },
      { status: 500 }
    );
  }
}
