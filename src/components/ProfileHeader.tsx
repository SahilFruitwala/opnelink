import Image from "next/image";
import { profile } from "../config/openlink";

export function ProfileHeader() {
  return (
    <header className="flex w-full flex-col items-center px-6 pt-8 pb-4 text-center">
      <div className="relative mb-4">
        <div className="profile-glow relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-white bg-cream transition-transform hover:scale-105 dark:border-white/10 dark:bg-zinc-900">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-primary text-white shadow-lg dark:border-zinc-950">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl font-black tracking-tight text-earth dark:text-earth">
          {profile.name}
        </h1>
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-earth/5 px-3 py-1 dark:bg-white/5">
          <span className="text-[11px] font-bold tracking-tight text-earth/60 dark:text-earth/70">
            {profile.handle}
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-[320px] text-[13px] font-medium leading-relaxed text-earth/60 dark:text-earth/80">
          {profile.bio}
        </p>
      </div>
    </header>
  );
}

