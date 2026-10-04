import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const COOKIE = "school_admin_token";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.text();
    const upstream = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
      cache: "no-store",
    });
    const responseText = await upstream.text();
    let body: {
      data?: { token?: string; [key: string]: unknown };
      [key: string]: unknown;
    };
    try {
      body = JSON.parse(responseText);
    } catch {
      console.error(
        `Admin login API returned non-JSON content (HTTP ${upstream.status})`,
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "The admin API returned an invalid response. Check the API URL and server.",
        },
        { status: 502 },
      );
    }
    const { token, ...safeData } = body?.data || {};
    const responseBody = token ? { ...body, data: safeData } : body;
    const response = NextResponse.json(responseBody, {
      status: upstream.status,
    });
    if (upstream.ok && token) {
      response.cookies.set(COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      response.headers.set("Cache-Control", "no-store");
    } else {
      response.cookies.set(COOKIE, "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
    }
    return response;
  } catch (error) {
    console.error(
      "Admin login proxy request failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      {
        success: false,
        message: `Could not connect to the admin service at ${API_BASE_URL}`,
      },
      { status: 502 },
    );
  }
}
