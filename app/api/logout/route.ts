import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LS_KEY } from "@/constants";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(LS_KEY.auth_token)?.value;
    if (!token) {
      return NextResponse.json(
        {
          status: "ERROR",
          message: "No active session found",
        },
        { status: 400 },
      );
    }

    // Call backend logout endpoint
    await fetch(`${API_BASE_URL}/api/v1/userapp/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Clear the cookie regardless of backend response
    await cookieStore.delete(LS_KEY.auth_token);

    return NextResponse.json({
      status: "SUCCESS",
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout API error:", error);
    // Clear cookie even on error
    const cookieStore = await cookies();
    await cookieStore.delete(LS_KEY.auth_token);

    return NextResponse.json({
      status: "SUCCESS",
      message: "Logout successful",
    });
  }
}
