import { describe, expect, it } from "vitest";
import { analyzeBirth } from "./analyze";

describe("analyzeBirth", () => {
  it("양력 예시 날짜의 의식·전의식과 타로를 조립한다", () => {
    const fact = analyzeBirth({
      solar: { year: 2026, month: 5, day: 22 },
    });
    expect(fact.layers.conscious.result.display).toBe("10");
    expect(fact.layers.preconscious.result.primary_value).toBe(1);
    expect(fact.layers.preconscious.result.display).toBe("1");
    expect(fact.layers.preconscious.result.display).not.toMatch(/[()]/);
    expect(fact.layers.unconscious).not.toBeNull();
    expect(fact.lunar).not.toBeNull();
    expect(fact.missing.some((note) => note.field === "astrology")).toBe(false);
  });

  it("음력 변환 실패 시 무의식층은 null이고 missing만 남긴다", () => {
    const fact = analyzeBirth({
      solar: { year: 2051, month: 3, day: 1 },
    });
    expect(fact.lunar).toBeNull();
    expect(fact.layers.unconscious).toBeNull();
    expect(fact.missing.some((note) => note.field === "lunar")).toBe(true);
  });

  it("잘못된 날짜는 계산하지 않는다", () => {
    expect(() => analyzeBirth({ solar: { year: 2026, month: 2, day: 31 } })).toThrow();
  });
});
