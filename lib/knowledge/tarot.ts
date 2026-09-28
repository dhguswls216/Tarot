export type TarotMeaning = {
  number: number;
  summary: string;
  asPattern: string;
  asQuestion: string;
};

export const TAROT_MEANINGS: Record<number, TarotMeaning> = {
  0: {
    number: 0,
    summary: "광대는 아직 닫히지 않은 길 위에서, 경험으로 정체성을 만들어 가는 상징이다.",
    asPattern: "완성된 역할보다 시작의 용기를 중심에 둔다.",
    asQuestion: "지금 붙잡고 있는 역할이 실제 필요한 보호인지, 익숙함인지 구분할 수 있는가?",
  },
  1: {
    number: 1,
    summary: "마법사는 의지와 도구를 연결해 현실에서 일을 일으키는 상징이다.",
    asPattern: "자원이 완벽하지 않아도 손에 있는 것으로 착수하려는 태도가 나타난다.",
    asQuestion: "지금 시작할 수 있는 가장 작은 실행 단위는 무엇인가?",
  },
  2: {
    number: 2,
    summary: "여사제는 드러나지 않은 정보와 내면의 지식을 지키는 상징이다.",
    asPattern: "즉시 말하기보다 침묵과 관찰로 진실을 가린다.",
    asQuestion: "아직 언어가 되지 않은 직감 중에, 확인이 필요한 것은 무엇인가?",
  },
  3: {
    number: 3,
    summary: "여황제는 성장, 감각, 돌봄을 통해 풍요를 구체화하는 상징이다.",
    asPattern: "사람과 환경이 자랄 수 있는 조건을 만들려 한다.",
    asQuestion: "지금 돌보는 것과, 실제로 회복되는 자원이 균형을 이루는가?",
  },
  4: {
    number: 4,
    summary: "황제는 규칙, 경계, 권한을 통해 질서를 세우는 상징이다.",
    asPattern: "모호한 상태를 구조와 책임으로 고정하려 한다.",
    asQuestion: "지금의 규칙은 안전을 만드는가, 움직임을 막는가?",
  },
  5: {
    number: 5,
    summary: "교황은 전통과 공유된 기준을 통해 배움과 소속을 잇는 상징이다.",
    asPattern: "검증된 체계와 스승, 공동의 언어에서 안정감을 찾는다.",
    asQuestion: "따르는 기준이 나의 판단인지, 익숙한 권위인지 구분되는가?",
  },
  6: {
    number: 6,
    summary: "연인은 가치의 정렬과 선택의 책임을 드러내는 상징이다.",
    asPattern: "관계와 가치 사이에서 무엇을 우선할지 묻는 국면이 반복된다.",
    asQuestion: "이 선택이 끌림인가, 내가 지키려는 가치인가?",
  },
  7: {
    number: 7,
    summary: "전차는 방향이 정해진 뒤 의지와 규율로 전진하는 상징이다.",
    asPattern: "상충하는 힘을 한 방향으로 묶어 성과를 내려 한다.",
    asQuestion: "지금 속도를 내는 방향이 내가 선택한 목적지와 같은가?",
  },
  8: {
    number: 8,
    summary: "힘은 강압이 아니라 부드러운 지속으로 본능을 다루는 상징이다.",
    asPattern: "압도하기보다 인내와 접촉으로 에너지를 다룬다.",
    asQuestion: "억누르는 것과 길들이는 것 중, 실제로 효과가 있는 쪽은 무엇인가?",
  },
  9: {
    number: 9,
    summary: "은둔자는 외부 소음에서 물러나 자신의 등불을 확인하는 상징이다.",
    asPattern: "혼자만의 탐구와 거리 두기가 통찰의 조건이 된다.",
    asQuestion: "고립이 필요한 성찰인지, 회피인지 어떻게 구분할 것인가?",
  },
  10: {
    number: 10,
    summary: "운명의 수레바퀴는 순환과 국면 전환을 보여주는 상징이다.",
    asPattern: "고정된 자리보다 돌아가는 타이밍에 주의가 간다.",
    asQuestion: "이번 변화에서 내가 조절할 수 있는 축은 어디인가?",
  },
  11: {
    number: 11,
    summary: "정의는 원인과 결과를 저울에 올려 책임을 분명히 하는 상징이다.",
    asPattern: "감정보다 기준, 변명보다 정합성을 요구한다.",
    asQuestion: "지금 결정의 기준은 공정인가, 익숙한 자기변호인가?",
  },
  12: {
    number: 12,
    summary: "매달린 사람은 통제를 잠시 내려놓고 관점을 뒤집는 상징이다.",
    asPattern: "밀어붙임이 통하지 않을 때 정지가 정보가 된다.",
    asQuestion: "멈추지 않으면 보이지 않는 것은 무엇인가?",
  },
  13: {
    number: 13,
    summary: "죽음은 한 형태의 종료와 다음 형태로의 이동을 상징한다. 신체적 죽음을 예언하지 않는다.",
    asPattern: "유지 비용이 큰 구조를 정리하고 재구성하는 흐름이 나타난다.",
    asQuestion: "이미 끝난 것을 연장하고 있는 영역은 어디인가?",
  },
  14: {
    number: 14,
    summary: "절제는 서로 다른 요소를 비율에 맞게 섞어 지속 가능한 흐름을 만드는 상징이다.",
    asPattern: "극단을 피하고 실험적 혼합으로 리듬을 찾는다.",
    asQuestion: "지금 과한 것과 부족한 것의 비율은 어떻게 다른가?",
  },
  15: {
    number: 15,
    summary: "악마는 유혹, 습관, 결속이 자유를 제한할 수 있음을 보여주는 상징이다.",
    asPattern: "강한 욕망과 익숙한 구도가 에너지를 붙잡는다.",
    asQuestion: "이 유대가 선택인가, 습관인가?",
  },
  16: {
    number: 16,
    summary: "탑은 허술한 구조가 드러날 때 정직한 재건이 시작됨을 상징한다.",
    asPattern: "겉으로 안정되어 보이던 전제가 흔들릴 수 있다.",
    asQuestion: "무너지면 안 되는 것과, 무너져도 되는 것은 어떻게 다른가?",
  },
  17: {
    number: 17,
    summary: "별은 회복과 지향점을 통해 다음 길을 비추는 상징이다.",
    asPattern: "지침 없는 상태에서도 작은 희망을 좌표로 삼는다.",
    asQuestion: "회복에 실제로 도움이 되는 루틴은 무엇인가?",
  },
  18: {
    number: 18,
    summary: "달은 불확실, 감정, 투사된 그림자를 통과하는 상징이다.",
    asPattern: "명확하지 않은 신호를 사실처럼 대할 위험이 있다.",
    asQuestion: "불안이 알려주는 것과, 불안이 만들어내는 이야기를 구분할 수 있는가?",
  },
  19: {
    number: 19,
    summary: "태양은 명료함과 활력이 드러나는 상태를 상징한다.",
    asPattern: "숨기지 않고 자신의 상태와 성과를 밝히려 한다.",
    asQuestion: "드러냄이 연결을 돕는가, 그늘을 지우게 하는가?",
  },
  20: {
    number: 20,
    summary: "심판은 지난 여정을 듣고 다음 소명에 응답하는 상징이다.",
    asPattern: "평가와 소환의 느낌이 선택을 재정렬한다.",
    asQuestion: "과거에서 배워 응답해야 할 구체적인 행동은 무엇인가?",
  },
  21: {
    number: 21,
    summary: "세계는 한 주기의 통합과 완성을 상징한다.",
    asPattern: "흩어진 경험을 하나의 이야기로 묶으려 한다.",
    asQuestion: "이 주기를 닫기 위해 남겨 둔 마무리는 무엇인가?",
  },
};

export function getTarotMeaning(number: number): TarotMeaning {
  const meaning = TAROT_MEANINGS[number];
  if (!meaning) {
    throw new Error(`지식베이스에 없는 메이저 아르카나입니다: ${number}`);
  }
  return meaning;
}
