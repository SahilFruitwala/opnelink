import Image from "next/image";
import { profile } from "../config/openlink";

export function ProfileHeader() {
  return (
    <header className="flex w-full flex-col items-center px-6 pt-2 pb-6 text-center">
      <div className="relative">
        <div className="profile-glow relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/80 bg-center bg-cover">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white">
          ✓
        </div>
      </div>

      <div className="glass flex items-center justify-center rounded-full px-4 py-1 mt-2">
        <span className="text-xs font-bold tracking-tight text-earth/80 dark:text-earth/90">
          {profile.handle}
        </span>
      </div>
      <div className="mt-3 space-y-1">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-earth dark:text-earth">
            {profile.name}
          </h1>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-primary dark:text-primary">
            {profile.role}
          </p>
        </div>
        <p className="mx-auto mt-1.5 max-w-[300px] text-xs leading-relaxed text-earth/60 dark:text-earth/70">
          {profile.bio}
        </p>
      </div>
    </header>
  );
}

