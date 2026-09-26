import { NextResponse } from "next/server";
import { getLinkClicksCollection } from "@/lib/mongodb";

export async function POST(
  _request: Request,
  { params }: { params: { linkId: string } },
) {
  try {
    const collection = await getLinkClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: params.linkId },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: doc?.count ?? 0 });
  } catch (error) {
    console.error("링크 클릭 수 집계 실패:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
