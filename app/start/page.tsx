import { AnalyzeForm } from "@/components/AnalyzeForm";

export default function StartPage() {
  return (
    <main
      className="relative min-h-screen bg-[#071018] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10, 28, 54, 0.42) 0%, rgba(10, 28, 54, 0.08) 22%, rgba(10, 28, 54, 0.18) 100%), url('/night.png')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-16 pt-24">
        <h1 className="font-[family-name:var(--font-serif)] text-3xl leading-snug text-[#fffaf2] drop-shadow sm:text-4xl">
          숫자로 패턴을 보고, 삶을 설계한다
        </h1>
        <p className="mt-4 w-full text-[15px] leading-7 text-[#fffaf2]/90 drop-shadow">
          고유 수비학으로 의식·무의식층의 수를 계산한 후 타로카드 메이저 아르카나에 대응합니다.
          <br />
          이는 미래를 확정하지 않습니다.
        </p>
        <div className="relative z-10 mt-8">
          <AnalyzeForm />
        </div>
      </div>
    </main>
  );
}
