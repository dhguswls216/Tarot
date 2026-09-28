"use client";

import { useState } from "react";
import type { InterpretationReport, LayerInterpretation } from "@/lib/types";

const glassPanel =
  "rounded-2xl border border-white/25 bg-[#0a1c36]/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-[10px]";

function TarotImage({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[2/3] w-32 items-center justify-center rounded-lg border border-[#e4d4ae]/25 bg-[#071018]/40 text-center text-xs text-[#e4d4ae] sm:w-40">
        카드 이미지를
        <br />
        불러오지 못했습니다
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="aspect-[2/3] w-32 rounded-lg object-contain bg-[#071018]/30 shadow-sm sm:w-40"
    />
  );
}

function LayerCard({ layer }: { layer: LayerInterpretation }) {
  return (
    <section className={glassPanel}>
      <h3 className="text-center font-[family-name:var(--font-serif)] text-xl text-[#fffaf2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
        {layer.nameKo}
      </h3>

      {layer.tarotImageSrc && layer.tarotNameEn ? (
        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <TarotImage src={layer.tarotImageSrc} name={layer.tarotNameEn} />
          <p className="text-sm text-[#f6edd8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            카드명: <span className="font-medium text-[#fffaf2]">{layer.tarotNameEn}</span>
            <span className="mt-1 block text-[#fffaf2]">{layer.tarotLabel}</span>
          </p>
        </div>
      ) : null}

      {layer.strengths.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-[#f6edd8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">강점</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-7 text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
            {layer.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {layer.cautions.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-[#f6edd8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">주의점</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-7 text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
            {layer.cautions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <details className="mt-4 rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-sm text-[#f6edd8]">
        <summary className="cursor-pointer select-none font-medium text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          FACT
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#fffaf2]">
          {layer.factLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </details>
      <p className="mt-4 text-[15px] leading-7 text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
        {layer.interpretation}
      </p>
    </section>
  );
}

export function ReportView({ report }: { report: InterpretationReport }) {
  return (
    <div className="space-y-6">
      {report.layers.map((layer) => (
        <LayerCard key={layer.layer} layer={layer} />
      ))}

      <section className={glassPanel}>
        <h3 className="font-[family-name:var(--font-serif)] text-xl text-[#fffaf2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          현실적인 적용
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
          {report.guidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <h4 className="mt-6 text-sm font-semibold tracking-wide text-[#f6edd8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          스스로에게 던질 질문
        </h4>
        <ul className="mt-2 space-y-2 text-[15px] leading-7 text-[#fffaf2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
          {report.questions.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
