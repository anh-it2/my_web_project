import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const res = await axios.post("http://localhost:8080/auth/login", payload);

    const data = res.data;

    const response = NextResponse.json(data, { status: 200 });

    response.cookies.set({
      name: "jwtToken",
      value: data.jwtToken,
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    });

    response.cookies.set({
      name: "role",
      value: data.role || "USER",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError<Error>;

    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? { message: "Unknown error" };

    console.error("Register backend error:", status, data);

    return NextResponse.json(
      {
        message: "Register failed",
        status,
        backend: data,
      },
      { status }
    );
  }
}
