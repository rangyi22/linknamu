import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

// 개발 모드에서는 핫 리로드로 모듈이 재실행돼도 연결을 재사용하도록 전역에 캐싱합니다.
export function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다.");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export type LinkClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

// 링크별 클릭 수를 담는 컬렉션. DB 이름은 MONGODB_URI 경로에 적힌 값을 그대로 따릅니다.
export async function getLinkClicksCollection() {
  const client = await getMongoClientPromise();
  return client.db().collection<LinkClickDoc>("linkClicks");
}
