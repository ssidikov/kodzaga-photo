import { Auth } from "@auth/core";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { authConfig, formatAuthError } from "@/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AuthLog = {
  level: "error" | "warn" | "debug";
  value: unknown;
};

function getDebugToken(request: Request) {
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1];
  return bearer ?? new URL(request.url).searchParams.get("token");
}

function assertDebugAccess(request: Request) {
  const expected = process.env.AUTH_DEBUG_TOKEN;
  if (!expected) {
    return {
      ok: false,
      status: 503,
      body: { error: "AUTH_DEBUG_TOKEN is not configured" },
    };
  }

  if (getDebugToken(request) !== expected) {
    return {
      ok: false,
      status: 401,
      body: { error: "Invalid debug token" },
    };
  }

  return { ok: true };
}

function inspectSecret(name: "AUTH_SECRET" | "NEXTAUTH_SECRET") {
  const value = process.env[name];
  return {
    present: Boolean(value),
    length: value?.length ?? 0,
    longEnough: (value?.length ?? 0) >= 32,
  };
}

function inspectUrl(name: "AUTH_URL" | "NEXTAUTH_URL") {
  const value = process.env[name];
  if (!value) return { present: false };

  try {
    const url = new URL(value);
    return {
      present: true,
      valid: true,
      origin: url.origin,
      pathname: url.pathname,
      protocol: url.protocol,
    };
  } catch (error) {
    return {
      present: true,
      valid: false,
      error: formatAuthError(error),
    };
  }
}

function inspectDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) return { present: false };

  try {
    const url = new URL(value);
    return {
      present: true,
      valid: true,
      protocol: url.protocol,
      host: url.host,
      database: url.pathname.replace(/^\//, ""),
    };
  } catch (error) {
    return {
      present: true,
      valid: false,
      error: formatAuthError(error),
    };
  }
}

function getRequestOrigin(request: Request) {
  const url = new URL(request.url);
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");

  return `${proto}://${host}`;
}

function getAuthActionOrigin(request: Request) {
  const configuredUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (!configuredUrl) return getRequestOrigin(request);

  return new URL(configuredUrl).origin;
}

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

function redactTokenFromUrl(value: string) {
  const url = new URL(value);
  if (url.searchParams.has("token")) {
    url.searchParams.set("token", "[redacted]");
  }
  return url.toString();
}

async function probeAuthConfig(request: Request) {
  const logs: AuthLog[] = [];

  try {
    const origin = getAuthActionOrigin(request);
    const response = await Auth(new Request(`${origin}/api/auth/error`), {
      ...authConfig,
      logger: {
        error(error) {
          const value = formatAuthError(error, true);
          logs.push({ level: "error", value });
          console.error("[auth-debug][core-error]", safeJson(value));
        },
        warn(code) {
          logs.push({ level: "warn", value: code });
          console.warn("[auth-debug][core-warn]", code);
        },
        debug(message, metadata) {
          logs.push({ level: "debug", value: { message, metadata } });
        },
      },
    });

    return {
      ok: response.status < 500 && !logs.some((log) => log.level === "error"),
      status: response.status,
      statusText: response.statusText,
      actionUrl: `${origin}/api/auth/error`,
      logs,
    };
  } catch (error) {
    const value = formatAuthError(error, true);
    console.error("[auth-debug][probe-fatal]", safeJson(value));
    return {
      ok: false,
      thrown: value,
      logs,
    };
  }
}

async function probeDatabase() {
  if (!process.env.DATABASE_URL) {
    return { ok: false, error: "DATABASE_URL is missing" };
  }

  try {
    await getDb().execute(sql`select 1 as ok`);
    return { ok: true };
  } catch (error) {
    const value = formatAuthError(error, true);
    console.error("[auth-debug][db-error]", safeJson(value));
    return { ok: false, error: value };
  }
}

export async function GET(request: Request) {
  const access = assertDebugAccess(request);
  if (!access.ok) {
    return NextResponse.json(access.body, { status: access.status });
  }

  const [authProbe, dbProbe] = await Promise.all([
    probeAuthConfig(request),
    probeDatabase(),
  ]);

  return NextResponse.json(
    {
      ok: authProbe.ok && dbProbe.ok,
      checkedAt: new Date().toISOString(),
      request: {
        url: redactTokenFromUrl(request.url),
        host: request.headers.get("host"),
        forwardedHost: request.headers.get("x-forwarded-host"),
        forwardedProto: request.headers.get("x-forwarded-proto"),
      },
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: Boolean(process.env.VERCEL),
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL_URL: process.env.VERCEL_URL,
        AUTH_SECRET: inspectSecret("AUTH_SECRET"),
        NEXTAUTH_SECRET: inspectSecret("NEXTAUTH_SECRET"),
        AUTH_URL: inspectUrl("AUTH_URL"),
        NEXTAUTH_URL: inspectUrl("NEXTAUTH_URL"),
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
        DATABASE_URL: inspectDatabaseUrl(),
      },
      authConfig: {
        basePath: authConfig.basePath,
        trustHost: authConfig.trustHost,
        hasSecret: Boolean(authConfig.secret),
        pages: authConfig.pages,
        providers: authConfig.providers.map((provider) =>
          typeof provider === "function" ? "function-provider" : provider.id
        ),
        session: authConfig.session,
      },
      probes: {
        auth: authProbe,
        database: dbProbe,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
