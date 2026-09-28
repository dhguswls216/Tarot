import { describe, expect, it } from "vitest";
import { mapToMajorArcana } from "./tarot";
import { computeLayer, reduceToRange, sumDigits } from "./numerology";

describe("sumDigits", () => {
  it("2053의 자릿수 합은 10이다", () => {
    expect(sumDigits(2053)).toBe(10);
  });
});

describe("reduceToRange", () => {
  it("22는 0(4)로 보존한다", () => {
    expect(reduceToRange(22, 22, true)).toEqual({
      raw_value: 22,
      primary_value: 0,
      secondary_value: 4,
      display: "0(4)",
      reductions: [],
    });
  });

  it("25는 7(5)로 축약한다", () => {
    expect(reduceToRange(25, 22, true)).toEqual({
      raw_value: 25,
      primary_value: 7,
      secondary_value: 5,
      display: "7(5)",
      reductions: [25],
    });
  });

  it("전의식층에서 10은 1로 축약한다", () => {
    const result = reduceToRange(10, 9, false);
    expect(result.primary_value).toBe(1);
    expect(result.raw_value).toBe(10);
    expect(result.display).toBe("1");
    expect(result.secondary_value).toBeNull();
  });

  it("전의식층에서 22는 0이 아니라 4로 축약한다", () => {
    const result = reduceToRange(22, 9, false);
    expect(result.primary_value).toBe(4);
    expect(result.display).toBe("4");
    expect(result.secondary_value).toBeNull();
  });
});

describe("computeLayer", () => {
  it("2026-05-22 의식층은 10이다", () => {
    const layer = computeLayer({
      layer: "conscious",
      calendar: "solar",
      input: { year: 2026, month: 5, day: 22 },
    });
    expect(layer.calculation.base_sum).toBe(2053);
    expect(layer.calculation.digit_sum).toBe(10);
    expect(layer.result).toEqual({
      raw_value: 10,
      primary_value: 10,
      secondary_value: null,
      display: "10",
    });
    expect(layer.tarot.majorArcana).toBe(10);
  });

  it("2026-05-22 전의식층은 1이다", () => {
    const layer = computeLayer({
      layer: "preconscious",
      calendar: "solar",
      input: { year: 2026, month: 5, day: 22 },
    });
    expect(layer.result.primary_value).toBe(1);
    expect(layer.tarot.majorArcana).toBe(1);
  });

  it("digit_sum 25인 날짜는 의식층 7(5)이다", () => {
    const layer = computeLayer({
      layer: "conscious",
      calendar: "solar",
      input: { year: 1955, month: 12, day: 11 },
    });
    expect(layer.calculation.base_sum).toBe(1978);
    expect(layer.calculation.digit_sum).toBe(25);
    expect(layer.result.display).toBe("7(5)");
    expect(layer.tarot.majorArcana).toBe(7);
  });

  it("digit_sum 22인 날짜는 의식층 0(4)이고 타로 0번이다", () => {
    const layer = computeLayer({
      layer: "conscious",
      calendar: "solar",
      input: { year: 1918, month: 10, day: 11 },
    });
    expect(layer.calculation.digit_sum).toBe(22);
    expect(layer.result).toEqual({
      raw_value: 22,
      primary_value: 0,
      secondary_value: 4,
      display: "0(4)",
    });
    expect(layer.tarot).toEqual(mapToMajorArcana(0));
    expect(layer.tarot.nameKo).toBe("광대");
  });
});
