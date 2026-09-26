"use client";

import type { LinkItem } from "@/data/profile";

type LinkCardProps = LinkItem & {
  clickCount: number;
  onRecordClick: (id: string) => void;
};

export default function LinkCard({
  id,
  label,
  url,
  clickCount,
  onRecordClick,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onRecordClick(id)}
      className="relative block w-full rounded-2xl border border-white/60 bg-white/40 px-14 py-4 text-center font-medium text-stone-800 shadow-[0_6px_20px_-6px_rgba(160,130,100,0.16)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-[0_10px_24px_-6px_rgba(160,130,100,0.22)] dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.4)] dark:hover:bg-white/10"
    >
      {label}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-stone-500 dark:text-stone-400">
        {clickCount.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
