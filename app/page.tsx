import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/landing-hero.jpg"
        alt="밤하늘 아래 길을 바라보는 사람"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1c36]/55 via-black/10 to-black/40" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-16 text-center">
        <div className="w-full max-w-5xl">
          <h1 className="font-[family-name:var(--font-serif)] text-4xl leading-tight text-[#fffaf2] drop-shadow sm:text-6xl sm:leading-tight">
            수비학과 타로로 보는 나
          </h1>
          <p className="mx-auto mt-6 max-w-none text-[15px] leading-7 text-[#fffaf2]/90 drop-shadow sm:mt-8 sm:whitespace-nowrap sm:text-lg sm:leading-8">
            숫자와 문자를 통해 나의 성격과 삶의 방향을 탐색합니다.
          </p>
          <Link
            href="/start"
            className="mt-10 inline-flex rounded-xl border border-[#e4d4ae]/50 bg-[#d4c39a]/18 px-8 py-3 text-sm font-medium tracking-wide text-[#f6edd8] shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-colors hover:border-[#e4d4ae]/80 hover:bg-[#d4c39a]/28 sm:mt-12"
          >
            시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}
