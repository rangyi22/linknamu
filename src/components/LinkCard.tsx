"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ id, label, url }: LinkItem) {
  const recordClick = () => {
    fetch(`/api/links/${id}/click`, { method: "POST", keepalive: true }).catch(
      () => {},
    );
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="block w-full rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-center font-medium text-stone-800 shadow-[0_6px_20px_-6px_rgba(120,80,40,0.2)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-[0_10px_24px_-6px_rgba(120,80,40,0.28)] dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.4)] dark:hover:bg-white/10"
    >
      {label}
    </a>
  );
}
