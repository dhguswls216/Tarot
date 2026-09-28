export const MAJOR_ARCANA: { number: number; nameKo: string; nameEn: string }[] = [
  { number: 0, nameKo: "광대", nameEn: "The Fool" },
  { number: 1, nameKo: "마법사", nameEn: "The Magician" },
  { number: 2, nameKo: "여사제", nameEn: "The High Priestess" },
  { number: 3, nameKo: "여황제", nameEn: "The Empress" },
  { number: 4, nameKo: "황제", nameEn: "The Emperor" },
  { number: 5, nameKo: "교황", nameEn: "The Hierophant" },
  { number: 6, nameKo: "연인", nameEn: "The Lovers" },
  { number: 7, nameKo: "전차", nameEn: "The Chariot" },
  { number: 8, nameKo: "힘", nameEn: "Strength" },
  { number: 9, nameKo: "은둔자", nameEn: "The Hermit" },
  { number: 10, nameKo: "운명의 수레바퀴", nameEn: "Wheel of Fortune" },
  { number: 11, nameKo: "정의", nameEn: "Justice" },
  { number: 12, nameKo: "매달린 사람", nameEn: "The Hanged Man" },
  { number: 13, nameKo: "죽음", nameEn: "Death" },
  { number: 14, nameKo: "절제", nameEn: "Temperance" },
  { number: 15, nameKo: "악마", nameEn: "The Devil" },
  { number: 16, nameKo: "탑", nameEn: "The Tower" },
  { number: 17, nameKo: "별", nameEn: "The Star" },
  { number: 18, nameKo: "달", nameEn: "The Moon" },
  { number: 19, nameKo: "태양", nameEn: "The Sun" },
  { number: 20, nameKo: "심판", nameEn: "Judgement" },
  { number: 21, nameKo: "세계", nameEn: "The World" },
];

export function mapToMajorArcana(primaryValue: number) {
  const number = primaryValue === 22 ? 0 : primaryValue;
  const card = MAJOR_ARCANA.find((item) => item.number === number);
  if (!card) {
    throw new Error(`메이저 아르카나 번호가 범위를 벗어났습니다: ${primaryValue}`);
  }
  return {
    majorArcana: card.number,
    nameKo: card.nameKo,
    nameEn: card.nameEn,
    imageSrc: `/tarot/${card.number}.jpg`,
  };
}
