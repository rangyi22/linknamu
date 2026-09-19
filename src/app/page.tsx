import DarkModeToggle from "@/components/DarkModeToggle";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center px-6 py-10 sm:py-14">
      <div className="w-full max-w-sm">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>
        <div className="mt-6 flex flex-col items-center gap-10 sm:mt-10">
          <ProfileHeader
            name={profile.name}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
          />
          <div className="flex w-full flex-col gap-4">
            {profile.links.map((link) => (
              <LinkCard key={link.id} {...link} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
