import { mapToMajorArcana } from "./tarot";
import type {
  CalendarKind,
  DateParts,
  LayerKind,
  LayerResult,
  LayerResultValues,
} from "./types";

export function sumDigits(value: number): number {
  return String(Math.abs(value))
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

export function baseSum(date: DateParts): number {
  return date.year + date.month + date.day;
}

export type ReductionOutcome = LayerResultValues & {
  reductions: number[];
};

export function reduceToRange(
  digitSum: number,
  max: number,
  applyTwentyTwoRule: boolean,
): ReductionOutcome {
  const reductions: number[] = [];
  let current = digitSum;

  while (current > max) {
    reductions.push(current);
    current = sumDigits(current);
  }

  if (applyTwentyTwoRule && current === 22) {
    return {
      raw_value: 22,
      primary_value: 0,
      secondary_value: 4,
      display: "0(4)",
      reductions,
    };
  }

  if (reductions.length > 0) {
    const lastBefore = reductions[reductions.length - 1];
    const secondary_value = lastBefore % 10;
    const hideSecondary = max <= 9;
    return {
      raw_value: reductions[0],
      primary_value: current,
      secondary_value: hideSecondary ? null : secondary_value,
      display: hideSecondary ? String(current) : `${current}(${secondary_value})`,
      reductions,
    };
  }

  return {
    raw_value: current,
    primary_value: current,
    secondary_value: null,
    display: String(current),
    reductions,
  };
}

export function computeLayer(options: {
  layer: LayerKind;
  calendar: CalendarKind;
  input: DateParts;
  lunarIntercalation?: boolean;
}): LayerResult {
  const { layer, calendar, input, lunarIntercalation } = options;
  const base_sum = baseSum(input);
  const digit_sum = sumDigits(base_sum);
  const max = layer === "preconscious" ? 9 : 22;
  const applyTwentyTwoRule = layer !== "preconscious";
  const reduced = reduceToRange(digit_sum, max, applyTwentyTwoRule);

  return {
    layer,
    calendar,
    input,
    ...(lunarIntercalation !== undefined ? { lunarIntercalation } : {}),
    calculation: {
      base_sum,
      digit_sum,
      reductions: reduced.reductions,
    },
    result: {
      raw_value: reduced.raw_value,
      primary_value: reduced.primary_value,
      secondary_value: reduced.secondary_value,
      display: reduced.display,
    },
    tarot: mapToMajorArcana(reduced.primary_value),
  };
}
