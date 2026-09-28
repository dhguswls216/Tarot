import { describe, expect, it } from "vitest";
import { analyzeBirth } from "./analyze";
import { interpretFacts } from "./interpret";
import { NUMBER_MEANINGS } from "./knowledge/numbers";
import { TAROT_MEANINGS } from "./knowledge/tarot";

describe("knowledge base", () => {
  it("0부터 22까지 숫자 의미가 있다", () => {
    for (let value = 0; value <= 22; value += 1) {
      expect(NUMBER_MEANINGS[value]).toBeDefined();
    }
  });

  it("메이저 0부터 21까지 의미가 있다", () => {
    for (let value = 0; value <= 21; value += 1) {
      expect(TAROT_MEANINGS[value]).toBeDefined();
    }
  });
});

describe("interpretFacts", () => {
  it("계산 FACT를 바꾸지 않고 템플릿 리포트를 만든다", () => {
    const fact = analyzeBirth({ solar: { year: 2026, month: 5, day: 22 } });
    const report = interpretFacts(fact);
    expect(report.headline.length).toBeGreaterThan(0);
    expect(report.layers).toHaveLength(3);
    expect(report.layers[0].display).toBe(fact.layers.conscious.result.display);
    expect(report.layers[1].display).toBe("1");
    expect(report.layers[1].strengths.length).toBeGreaterThan(0);
    expect(report.layers[1].cautions.length).toBeGreaterThan(0);
    expect(report.questions).toHaveLength(3);
    expect(JSON.stringify(report)).not.toContain("점성학");
    expect(JSON.stringify(report)).not.toContain("세 층의 상호작용");
  });

  it("음력 실패 시 무의식 섹션에 한계를 명시한다", () => {
    const fact = analyzeBirth({ solar: { year: 2051, month: 3, day: 1 } });
    const report = interpretFacts(fact);
    expect(report.layers[2].display).toBe("—");
    expect(report.layers[2].unavailableReason).toBeTruthy();
  });
});
