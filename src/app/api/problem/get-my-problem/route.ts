import { MyProblem } from "@/services/rest/problem/get-my-problem/type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const jwtToken = req.cookies.get("jwtToken");

  try {
    const res = await axios.get(" http://localhost:8080/problems/me", {
      headers: {
        Authorization: `Bearer ${jwtToken?.value}`,
      },
    });

    res.data = !res.data ? [] : Array.isArray(res.data) ? res.data : [res.data];

    const data = res.data.map((item: MyProblem) => ({
      ...item,
      maxScore: 100,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Have an error: ${error}` },
      { status: 500 }
    );
  }
}
