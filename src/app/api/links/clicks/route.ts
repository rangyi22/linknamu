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
    // 200으로 감추면 "그냥 0회"로 보여 원인을 찾기 어렵습니다. 실패는 실패로 알립니다.
    return NextResponse.json({ ok: false, counts: {} }, { status: 500 });
  }
}
