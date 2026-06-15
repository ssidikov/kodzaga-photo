import { and, eq, ilike, or, type SQL } from "drizzle-orm";
import { reservations } from "@/lib/db/schema";

export const RESERVATION_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export interface ReservationFilters {
  q: string;
  status: ReservationStatus | "";
}

export function parseReservationFilters(input: {
  q?: string | string[] | null;
  status?: string | string[] | null;
}): ReservationFilters {
  const q = firstValue(input.q).trim().slice(0, 100);
  const status = firstValue(input.status);

  return {
    q,
    status: isReservationStatus(status) ? status : "",
  };
}

export function buildReservationWhere({ q, status }: ReservationFilters) {
  const conditions: SQL[] = [];

  if (q) {
    const pattern = `%${escapeLike(q)}%`;
    const search = or(
      ilike(reservations.name, pattern),
      ilike(reservations.email, pattern),
      ilike(reservations.prestation, pattern)
    );
    if (search) conditions.push(search);
  }

  if (status) {
    conditions.push(eq(reservations.status, status));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

function firstValue(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function isReservationStatus(value: string): value is ReservationStatus {
  return RESERVATION_STATUSES.includes(value as ReservationStatus);
}

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}
