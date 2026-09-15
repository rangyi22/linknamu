import DarkModeToggle from "@/components/DarkModeToggle";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-neutral-50 px-4 py-10 dark:bg-neutral-900">
      <div className="w-full max-w-md">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>
        <div className="mt-4 flex flex-col items-center gap-6">
          <ProfileHeader
            name={profile.name}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
          />
          <div className="flex w-full flex-col gap-5">
            {profile.links.map((link) => (
              <LinkCard key={link.id} {...link} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
