import { describe, expect, it } from "vitest";
import { formatLunarDate, parseIsoDate, solarToLunar } from "./lunar";

describe("solarToLunar", () => {
  it("지원 범위의 양력을 음력으로 변환한다", () => {
    const lunar = solarToLunar({ year: 2017, month: 6, day: 24 });
    expect(lunar).toEqual({
      year: 2017,
      month: 5,
      day: 1,
      intercalation: true,
    });
  });

  it("지원 범위 밖이면 null을 반환하고 임의 보정하지 않는다", () => {
    expect(solarToLunar({ year: 2051, month: 1, day: 1 })).toBeNull();
  });

  it("윤달을 구분해 표기한다", () => {
    const lunar = solarToLunar({ year: 2017, month: 6, day: 24 });
    expect(lunar).not.toBeNull();
    expect(formatLunarDate(lunar!)).toBe("2017년 윤5월 1일");
  });

  it("잘못된 ISO 날짜는 파싱하지 않는다", () => {
    expect(parseIsoDate("2026-02-31")).toBeNull();
    expect(parseIsoDate("2026-05-22")).toEqual({ year: 2026, month: 5, day: 22 });
  });
});
