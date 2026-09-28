import KoreanLunarCalendar from "korean-lunar-calendar";
import type { DateParts } from "./types";

export type LunarDate = DateParts & { intercalation: boolean };

export function solarToLunar(solar: DateParts): LunarDate | null {
  try {
    const calendar = new KoreanLunarCalendar();
    const ok = calendar.setSolarDate(solar.year, solar.month, solar.day);
    if (!ok) return null;
    const lunar = calendar.getLunarCalendar();
    if (!lunar || !Number.isFinite(lunar.year) || !Number.isFinite(lunar.month) || !Number.isFinite(lunar.day)) {
      return null;
    }
    return {
      year: lunar.year,
      month: lunar.month,
      day: lunar.day,
      intercalation: Boolean(lunar.intercalation),
    };
  } catch {
    return null;
  }
}

export function formatLunarDate(lunar: LunarDate): string {
  const leap = lunar.intercalation ? "윤" : "";
  return `${lunar.year}년 ${leap}${lunar.month}월 ${lunar.day}일`;
}

export function parseIsoDate(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) {
    return null;
  }
  return { year, month, day };
}
