import { NextResponse } from "next/server";
import { getMongoClientPromise } from "@/lib/mongodb";

type LinkClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

export async function POST(
  _request: Request,
  { params }: { params: { linkId: string } },
) {
  try {
    const client = await getMongoClientPromise();
    const db = client.db("linknamu");
    await db.collection<LinkClickDoc>("linkClicks").updateOne(
      { _id: params.linkId },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("링크 클릭 수 집계 실패:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
