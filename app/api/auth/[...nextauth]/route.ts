import { formatAuthError, handlers } from "@/auth";
import type { NextRequest } from "next/server";

async function runAuthHandler(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<Response>
) {
  try {
    return await handler(request);
  } catch (error) {
    console.error("[auth-route][fatal]", JSON.stringify(formatAuthError(error, true)));
    throw error;
  }
}

export function GET(request: NextRequest) {
  return runAuthHandler(request, handlers.GET);
}

export function POST(request: NextRequest) {
  return runAuthHandler(request, handlers.POST);
}
