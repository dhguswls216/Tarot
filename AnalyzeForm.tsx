"use client";

import { useActionState, useMemo, useState } from "react";
import { analyzeBirthAction, type AnalyzeState } from "@/app/actions";
import { ReportView } from "@/components/ReportView";
import { formatLunarDate, parseIsoDate, solarToLunar } from "@/lib/lunar";

const initialState: AnalyzeState = null;

const glassPanel =
  "rounded-2xl border border-white/25 bg-[#0a1c36]/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-[10px] sm:p-6";

export function AnalyzeForm() {
  const [state, formAction, pending] = useActionState(analyzeBirthAction, initialState);
  const [solarDate, setSolarDate] = useState("1990-05-22");

  const lunarLabel = useMemo(() => {
    const parsed = parseIsoDate(solarDate);
    if (!parsed) {
      return "유효한 양력 생일을 입력하면 음력이 표시됩니다.";
    }
    const lunar = solarToLunar(parsed);
    if (!lunar) {
      return "이 날짜는 음력으로 변환할 수 없습니다.";
    }
    return formatLunarDate(lunar);
  }, [solarDate]);

  return (
    <div className="space-y-8">
      <form action={formAction} className={glassPanel}>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl text-[#fffaf2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          출생 정보 입력
        </h2>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            양력 생일
            <input
              required
              name="solarDate"
              type="date"
              min="1000-02-13"
              max="2050-12-31"
              value={solarDate}
              onChange={(event) => setSolarDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/35 bg-black/25 px-3 py-2 text-base font-normal text-[#fffaf2] [color-scheme:dark]"
            />
          </label>
          <label className="block text-sm font-medium text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            음력 생일
            <input
              readOnly
              value={lunarLabel}
              className="mt-1 w-full rounded-lg border border-white/25 bg-black/20 px-3 py-2 text-base font-normal text-[#fffaf2]"
            />
          </label>
        </div>

        {state?.error ? (
          <p className="mt-4 rounded-lg border border-red-200/30 bg-red-950/40 px-3 py-2 text-sm text-[#f8d0c8]">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-xl border border-[#e4d4ae]/55 bg-[#d4c39a]/15 px-4 py-3 text-sm font-medium tracking-wide text-[#fffaf2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] transition-colors hover:bg-[#d4c39a]/28 disabled:opacity-60"
        >
          {pending ? "계산 중…" : "결과보기"}
        </button>
      </form>

      {state?.fact && state.report ? <ReportView report={state.report} /> : null}
    </div>
  );
}
