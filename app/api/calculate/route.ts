import { NextResponse } from "next/server";
import { analyzeBirth } from "@/lib/analyze";
import { interpretFacts } from "@/lib/interpret";

type Body = {
  year?: number;
  month?: number;
  day?: number;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "요청 본문을 읽을 수 없습니다." }, { status: 400 });
  }

  try {
    const fact = analyzeBirth({
      solar: {
        year: Number(body.year),
        month: Number(body.month),
        day: Number(body.day),
      },
    });
    const report = interpretFacts(fact);
    return NextResponse.json({ fact, report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "계산에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
