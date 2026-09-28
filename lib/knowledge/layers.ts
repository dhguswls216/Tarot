import type { LayerKind } from "../types";

export type LayerFrame = {
  layer: LayerKind;
  nameKo: string;
  lens: string;
  readsAs: string;
};

export const LAYER_FRAMES: Record<LayerKind, LayerFrame> = {
  conscious: {
    layer: "conscious",
    nameKo: "의식층",
    lens: "양력 생일을 사용한 사회적 페르소나, 실행 방식, 외부에 보이는 정체성",
    readsAs: "이 층의 숫자는 세상에 대응하는 방식과 의식적으로 선택하는 행동 경향을 설명한다.",
  },
  preconscious: {
    layer: "preconscious",
    nameKo: "전의식층",
    lens: "양력 생일을 0~9로 축약한 심리적 필터, 자극에 대한 즉각 반응",
    readsAs: "이 층의 숫자는 평소에는 잘 안 보이다가 특정 상황에서 빠르게 나타나는 중간 패턴을 설명한다.",
  },
  unconscious: {
    layer: "unconscious",
    nameKo: "무의식층",
    lens: "음력 생일을 사용한 내면 동기, 원초적 욕구와 반복되는 심리적 뿌리",
    readsAs: "이 층의 숫자는 의식적으로 설명하기 어려운 행동의 근원을 상징으로 설명한다.",
  },
};
