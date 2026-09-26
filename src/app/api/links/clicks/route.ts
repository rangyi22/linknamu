import { NextResponse } from "next/server";
import { getLinkClicksCollection } from "@/lib/mongodb";

// 매 요청마다 최신 클릭 수를 읽어야 하므로 캐시하지 않습니다.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collection = await getLinkClicksCollection();
    const docs = await collection.find({}).toArray();

    const counts: Record<string, number> = {};
    for (const doc of docs) {
      counts[doc._id] = doc.count ?? 0;
    }

    return NextResponse.json({ ok: true, counts });
  } catch (error) {
    console.error("링크 클릭 수 조회 실패:", error);
    // 집계는 부가 기능이므로 실패해도 페이지는 정상 동작해야 합니다.
    return NextResponse.json({ ok: false, counts: {} }, { status: 200 });
  }
}
