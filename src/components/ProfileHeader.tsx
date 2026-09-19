import type { Profile } from "@/data/profile";

export default function ProfileHeader({
  name,
  bio,
  avatarUrl,
}: Pick<Profile, "name" | "bio" | "avatarUrl">) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/70 shadow-[0_10px_30px_-8px_rgba(180,110,60,0.45)] dark:ring-white/10 dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={`${name} 프로필 사진`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-800 text-4xl font-semibold text-white dark:bg-stone-200 dark:text-stone-900">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
          {name}
        </h1>
        <p className="text-balance text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {bio}
        </p>
      </div>
    </div>
  );
}
