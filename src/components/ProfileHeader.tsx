import type { Profile } from "@/data/profile";

export default function ProfileHeader({
  name,
  bio,
  avatarUrl,
}: Pick<Profile, "name" | "bio" | "avatarUrl">) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="h-36 w-36 overflow-hidden rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={`${name} 프로필 사진`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-4xl font-semibold text-white dark:bg-neutral-200 dark:text-neutral-900">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {name}
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{bio}</p>
    </div>
  );
}
