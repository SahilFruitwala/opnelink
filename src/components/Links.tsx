"use client";

import { featuredLinks, links } from "../config/openlink";
import { TrackedLink } from "./TrackedLink";

export function FeaturedLinks() {
  if (!featuredLinks.length) return null;

  return (
    <section className="space-y-3 pt-2">
      {featuredLinks.map((item) => (
        <TrackedLink
          key={item.label}
          href={item.href}
          section="featured"
          label={item.label}
          extraUTM={
            item.highlightKey ? { utm_content: item.highlightKey } : undefined
          }
          className="group glass relative flex min-h-[64px] items-center justify-center gap-4 rounded-3xl p-4 transition-all hover:scale-[1.02] hover:bg-white/50 dark:hover:bg-white/10"
        >
          {(item.iconEmoji || item.iconImageUrl) && (
            <div className="absolute left-4 flex h-8 w-8 shrink-0 items-center justify-center text-earth transition-transform group-hover:scale-110 dark:text-earth">
              {item.iconImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.iconImageUrl}
                  alt={`${item.label} icon`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xl">{item.iconEmoji}</span>
              )}
            </div>
          )}
          
          <div className="flex flex-col items-center justify-center gap-0.5 px-8 text-center">
            <p className="text-sm font-bold text-earth dark:text-earth">
              {item.label}
            </p>
            {item.description && (
              <p className="text-[10px] font-medium text-earth/60 dark:text-earth/70">
                {item.description}
              </p>
            )}
          </div>

          <div className="absolute right-4 flex items-center gap-2">
            {item.badge && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream shadow-sm">
                {item.badge}
              </span>
            )}
          </div>
        </TrackedLink>
      ))}
    </section>
  );
}

export function LinkList() {
  if (!links.length) return null;

  return (
    <section className="space-y-3">
      {links.map((item) => (
        <TrackedLink
          key={item.label}
          href={item.href}
          section="links"
          label={item.label}
          className="group glass relative flex min-h-[56px] items-center justify-center gap-4 rounded-3xl p-4 transition-all hover:scale-[1.02] hover:bg-white/50 dark:hover:bg-white/10"
        >
          {(item.iconEmoji || item.iconImageUrl) && (
            <div className="absolute left-4 flex h-8 w-8 shrink-0 items-center justify-center text-earth transition-transform group-hover:scale-110 dark:text-earth">
              {item.iconImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.iconImageUrl}
                  alt={`${item.label} icon`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xl">{item.iconEmoji}</span>
              )}
            </div>
          )}
          
          <div className="flex flex-col items-center justify-center px-8 text-center">
            <p className="text-sm font-bold text-earth dark:text-earth">{item.label}</p>
          </div>
        </TrackedLink>
      ))}
    </section>
  );
}

