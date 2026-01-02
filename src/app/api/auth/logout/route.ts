import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout success" },
      { status: 200 }
    );

    response.cookies.delete("jwtToken");
    response.cookies.delete("role");

    return response;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
