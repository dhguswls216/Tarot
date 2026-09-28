export type CalendarKind = "solar" | "lunar";

export type LayerKind = "conscious" | "preconscious" | "unconscious";

export type DateParts = {
  year: number;
  month: number;
  day: number;
};

export type LayerCalculation = {
  base_sum: number;
  digit_sum: number;
  reductions: number[];
};

export type LayerResultValues = {
  raw_value: number;
  primary_value: number;
  secondary_value: number | null;
  display: string;
};

export type TarotMapping = {
  majorArcana: number;
  nameKo: string;
  nameEn: string;
  imageSrc: string;
};

export type LayerResult = {
  layer: LayerKind;
  calendar: CalendarKind;
  input: DateParts;
  lunarIntercalation?: boolean;
  calculation: LayerCalculation;
  result: LayerResultValues;
  tarot: TarotMapping;
};

export type MissingDataNote = {
  field: string;
  message: string;
};

export type AnalysisFact = {
  solar: DateParts;
  lunar: (DateParts & { intercalation: boolean }) | null;
  layers: {
    conscious: LayerResult;
    preconscious: LayerResult;
    unconscious: LayerResult | null;
  };
  missing: MissingDataNote[];
};

export type LayerInterpretation = {
  layer: LayerKind;
  nameKo: string;
  display: string;
  tarotLabel: string;
  tarotNameEn: string | null;
  tarotImageSrc: string | null;
  factLines: string[];
  interpretation: string;
  strengths: string[];
  cautions: string[];
  unavailableReason?: string;
};

export type InterpretationReport = {
  headline: string;
  layers: LayerInterpretation[];
  guidance: string[];
  questions: string[];
};
