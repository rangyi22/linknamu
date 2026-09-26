"use client";

import { useCallback, useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 비어 있으므로 모든 카드가 0회로 표시됩니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
    fetch("/api/links/clicks")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.counts) {
          setCounts(data.counts);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const recordClick = useCallback((id: string) => {
    // 새 탭으로 이동하는 동안 기다리지 않도록 화면부터 먼저 올려 줍니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch(`/api/links/${id}/click`, { method: "POST", keepalive: true })
      .then(async (res) => {
        const data = res.ok ? await res.json() : null;
        if (typeof data?.count !== "number") {
          throw new Error("클릭 수 기록에 실패했습니다.");
        }
        // 서버가 확정한 값으로 맞춥니다.
        setCounts((prev) => ({ ...prev, [id]: data.count }));
      })
      .catch(() => {
        // 저장되지 않았는데 올라간 숫자를 남겨 두면 기록된 것처럼 보입니다. 되돌립니다.
        setCounts((prev) => ({
          ...prev,
          [id]: Math.max(0, (prev[id] ?? 1) - 1),
        }));
      });
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          {...link}
          clickCount={counts[link.id] ?? 0}
          onRecordClick={recordClick}
        />
      ))}
    </div>
  );
}
