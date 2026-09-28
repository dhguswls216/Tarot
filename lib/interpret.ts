import { LAYER_FRAMES } from "./knowledge/layers";
import { getNumberMeaning } from "./knowledge/numbers";
import { getTarotMeaning } from "./knowledge/tarot";
import type {
  AnalysisFact,
  InterpretationReport,
  LayerInterpretation,
  LayerResult,
} from "./types";

function formatDate(parts: { year: number; month: number; day: number }): string {
  return `${parts.year}년 ${parts.month}월 ${parts.day}일`;
}

function secondaryClause(layer: LayerResult): string {
  if (layer.layer === "preconscious") return "";
  if (layer.result.secondary_value === null) return "";
  const secondary = getNumberMeaning(layer.result.secondary_value);
  return ` 주 숫자는 ${layer.result.primary_value}이지만, 축약 과정에서 ${layer.result.secondary_value}(${secondary.title})의 성질도 함께 포함되어 있다.`;
}

function insightBullets(layer: LayerResult): { strengths: string[]; cautions: string[] } {
  const number = getNumberMeaning(layer.result.primary_value);
  const tarot = getTarotMeaning(layer.tarot.majorArcana);
  return {
    strengths: [number.strength, tarot.asPattern, number.pattern].slice(0, 3),
    cautions: [
      number.caution,
      "이 경향이 과하면 균형이 깨질 수 있으니, 중요한 선택 전에 한 번 더 점검하는 것이 도움이 될 수 있다.",
    ],
  };
}

function interpretLayer(layer: LayerResult): LayerInterpretation {
  const frame = LAYER_FRAMES[layer.layer];
  const number = getNumberMeaning(layer.result.primary_value);
  const tarot = getTarotMeaning(layer.tarot.majorArcana);
  const calendarLabel = layer.calendar === "solar" ? "양력" : "음력";
  const intercalation =
    layer.lunarIntercalation === true ? " (윤달)" : layer.lunarIntercalation === false ? " (평달)" : "";
  const insights = insightBullets(layer);

  const factLines =
    layer.layer === "preconscious"
      ? [
          `${calendarLabel} ${formatDate(layer.input)}`,
          `전의식 결과 ${layer.result.display}`,
          `타로 대응: ${layer.tarot.majorArcana}번 ${layer.tarot.nameKo} (${layer.tarot.nameEn})`,
        ]
      : [
          `${calendarLabel} ${formatDate(layer.input)}${intercalation}`,
          `년+월+일 = ${layer.calculation.base_sum}, 자릿수 합 = ${layer.calculation.digit_sum}`,
          layer.calculation.reductions.length
            ? `축약 과정: ${layer.calculation.reductions.join(" → ")} → ${layer.result.display}`
            : `축약 없음. 결과 ${layer.result.display}`,
          `타로 대응: ${layer.tarot.majorArcana}번 ${layer.tarot.nameKo} (${layer.tarot.nameEn})`,
        ];

  const interpretation = [
    `${frame.readsAs}`,
    `${number.title} 패턴 — ${number.summary}`,
    number.pattern + secondaryClause(layer),
    `타로에서는 ${layer.tarot.nameKo}: ${tarot.summary} ${tarot.asPattern}`,
  ].join(" ");

  return {
    layer: layer.layer,
    nameKo: frame.nameKo,
    display: layer.result.display,
    tarotLabel: `${layer.tarot.majorArcana} · ${layer.tarot.nameKo}`,
    tarotNameEn: layer.tarot.nameEn,
    tarotImageSrc: layer.tarot.imageSrc,
    factLines,
    interpretation,
    strengths: insights.strengths,
    cautions: insights.cautions,
  };
}

function buildHeadline(fact: AnalysisFact): string {
  const conscious = getNumberMeaning(fact.layers.conscious.result.primary_value);
  const pre = getNumberMeaning(fact.layers.preconscious.result.primary_value);
  const unconscious = fact.layers.unconscious
    ? getNumberMeaning(fact.layers.unconscious.result.primary_value)
    : null;

  if (!unconscious) {
    return `의식층은 ${conscious.theme}, 전의식층은 ${pre.theme}으로 나타난다. 음력 데이터가 없어 무의식층은 판단하지 않는다.`;
  }

  const themes = [conscious.theme, pre.theme, unconscious.theme];
  const unique = [...new Set(themes)];
  if (unique.length === 1) {
    return `세 층에서 ${unique[0]} 테마가 반복된다. 확정된 미래가 아니라, 현재 데이터에서 두드러지는 패턴이다.`;
  }
  if (conscious.theme === unconscious.theme) {
    return `겉으로 보이는 방식과 내면의 뿌리가 ${conscious.theme}으로 맞닿아 있고, 전의식은 ${pre.theme}으로 그 사이를 필터링한다.`;
  }
  if (unique.length === 3) {
    return `의식·전의식·무의식이 서로 다른 테마를 보인다. 하나의 성격으로 합치지 않고, 상황에 따라 다른 층이 앞서는 양면 패턴으로 읽는다.`;
  }
  return `반복되는 축은 ${unique[0]}와 ${unique[1]}이다. 두 주제가 교차하는 지점을 중심으로 현재 선택을 점검할 수 있다.`;
}

export function interpretFacts(fact: AnalysisFact): InterpretationReport {
  const layers: LayerInterpretation[] = [
    interpretLayer(fact.layers.conscious),
    interpretLayer(fact.layers.preconscious),
  ];

  if (fact.layers.unconscious) {
    layers.push(interpretLayer(fact.layers.unconscious));
  } else {
    const lunarMissing = fact.missing.find((note) => note.field === "lunar");
    layers.push({
      layer: "unconscious",
      nameKo: LAYER_FRAMES.unconscious.nameKo,
      display: "—",
      tarotLabel: "계산하지 않음",
      tarotNameEn: null,
      tarotImageSrc: null,
      factLines: [lunarMissing?.message ?? "음력 데이터가 없어 무의식층을 계산하지 않았다."],
      interpretation:
        "확인되지 않은 음력 날짜를 추정하지 않았다. 무의식층의 숫자와 타로 대응은 음력이 확보된 뒤에만 해석한다.",
      strengths: [],
      cautions: [],
      unavailableReason: lunarMissing?.message,
    });
  }

  const conscious = fact.layers.conscious;
  const pre = fact.layers.preconscious;
  const cMean = getNumberMeaning(conscious.result.primary_value);
  const pMean = getNumberMeaning(pre.result.primary_value);
  const cTarot = getTarotMeaning(conscious.tarot.majorArcana);
  const pTarot = getTarotMeaning(pre.tarot.majorArcana);

  const guidance = [
    `의식층의 ${cMean.title} 패턴을 기준으로, 오늘은 ${cMean.strength}를 한 가지 구체적인 행동으로 옮겨 본다.`,
    `전의식의 ${pMean.title}이 과하게 나오면 ${pMean.caution}을 점검 신호로 쓴다.`,
    "질병, 수명, 투자 수익, 이별·이직의 정답은 이 데이터로 단정하지 않는다. 패턴을 보고 현실의 조건과 함께 판단한다.",
  ];

  const questions = [
    cTarot.asQuestion,
    pTarot.asQuestion,
    fact.layers.unconscious
      ? getTarotMeaning(fact.layers.unconscious.tarot.majorArcana).asQuestion
      : "음력 생일이 확인되면, 반복되는 내면 욕구를 어떤 사실로 검증할 수 있는가?",
  ];

  return {
    headline: buildHeadline(fact),
    layers,
    guidance,
    questions,
  };
}
