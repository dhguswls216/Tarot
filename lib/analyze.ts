import { solarToLunar } from "./lunar";
import { computeLayer } from "./numerology";
import type { AnalysisFact, DateParts, MissingDataNote } from "./types";

export type AnalyzeInput = {
  solar: DateParts;
};

export function isValidSolarDate(solar: DateParts): boolean {
  const { year, month, day } = solar;
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const utc = new Date(Date.UTC(year, month - 1, day));
  return utc.getUTCFullYear() === year && utc.getUTCMonth() === month - 1 && utc.getUTCDate() === day;
}

export function analyzeBirth(input: AnalyzeInput): AnalysisFact {
  if (!isValidSolarDate(input.solar)) {
    throw new Error("유효한 양력 생년월일을 입력해야 합니다.");
  }

  const missing: MissingDataNote[] = [];
  const lunar = solarToLunar(input.solar);
  if (!lunar) {
    missing.push({
      field: "lunar",
      message: "음력 변환이 확실하지 않아 무의식층은 계산하지 않았다. 임의의 음력 날짜를 넣지 않았다.",
    });
  }

  const conscious = computeLayer({
    layer: "conscious",
    calendar: "solar",
    input: input.solar,
  });
  const preconscious = computeLayer({
    layer: "preconscious",
    calendar: "solar",
    input: input.solar,
  });
  const unconscious = lunar
    ? computeLayer({
        layer: "unconscious",
        calendar: "lunar",
        input: { year: lunar.year, month: lunar.month, day: lunar.day },
        lunarIntercalation: lunar.intercalation,
      })
    : null;

  return {
    solar: input.solar,
    lunar,
    layers: {
      conscious,
      preconscious,
      unconscious,
    },
    missing,
  };
}
