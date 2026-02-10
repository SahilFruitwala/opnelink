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
          className="group glass flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-white/50 dark:hover:bg-white/10"
        >
          {(item.iconEmoji || item.iconImageUrl) && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-earth transition-transform group-hover:scale-110 dark:bg-accent/30 dark:text-earth">
              {item.iconImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.iconImageUrl}
                  alt={`${item.label} icon`}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <span className="text-xl">{item.iconEmoji}</span>
              )}
            </div>
          )}
          <div className="flex flex-1 items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-bold text-earth dark:text-earth">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[10px] text-earth/60 dark:text-earth/70">
                  {item.description}
                </p>
              )}
            </div>
            {item.badge && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream shadow-sm">
                {item.badge}
              </span>
            )}
            <span className="text-sm text-earth/30 dark:text-earth/40">›</span>
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
          className="group glass flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-white/50 dark:hover:bg-white/10"
        >
          {(item.iconEmoji || item.iconImageUrl) && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-earth transition-transform group-hover:scale-110 dark:bg-accent/30 dark:text-earth">
              {item.iconImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.iconImageUrl}
                  alt={`${item.label} icon`}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <span className="text-xl">{item.iconEmoji}</span>
              )}
            </div>
          )}
          <div className="flex flex-1 items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-bold text-earth dark:text-earth">{item.label}</p>
            </div>
            <span className="text-sm text-earth/30 dark:text-earth/40">›</span>
          </div>
        </TrackedLink>
      ))}
    </section>
  );
}

