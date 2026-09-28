"use server";

import { analyzeBirth } from "@/lib/analyze";
import { interpretFacts } from "@/lib/interpret";
import { parseIsoDate } from "@/lib/lunar";
import type { AnalysisFact, InterpretationReport } from "@/lib/types";

export type AnalyzeState = {
  error?: string;
  fact?: AnalysisFact;
  report?: InterpretationReport;
} | null;

export async function analyzeBirthAction(_prev: AnalyzeState, formData: FormData): Promise<AnalyzeState> {
  const solarDate = String(formData.get("solarDate") ?? "");
  const parsed = parseIsoDate(solarDate);

  if (!parsed) {
    return { error: "유효한 양력 생년월일을 입력해 주세요." };
  }

  try {
    const fact = analyzeBirth({ solar: parsed });
    const report = interpretFacts(fact);
    return { fact, report };
  } catch (error) {
    const message = error instanceof Error ? error.message : "분석을 완료하지 못했습니다.";
    return { error: message };
  }
}
