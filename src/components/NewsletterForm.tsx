"use client";

import { useState } from "react";
import { newsletter } from "../config/openlink";
import { posthog } from "../lib/posthogClient";
import { getTrackingContext } from "../lib/tracking";

function showNewsletterSection(): boolean {
  if (newsletter.provider === "beehiiv") return true;
  if (newsletter.provider === "custom" && newsletter.action) return true;
  return false;
}

export function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!showNewsletterSection()) return null;

  const isBeehiiv = newsletter.provider === "beehiiv";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (isBeehiiv) {
      setError(null);
      setSubmitting(true);
      const form = e.currentTarget;
      const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
      const email = emailInput?.value?.trim() ?? "";
      if (!email) {
        setSubmitting(false);
        return;
      }

      const context = getTrackingContext();
      const body: Record<string, string> = { email };
      if (context?.utm) {
        if (context.utm.utm_source) body.utm_source = context.utm.utm_source;
        if (context.utm.utm_medium) body.utm_medium = context.utm.utm_medium;
        if (context.utm.utm_campaign) body.utm_campaign = context.utm.utm_campaign;
        if (context.utm.utm_term) body.utm_term = context.utm.utm_term;
        if (context.utm.utm_content) body.utm_content = context.utm.utm_content;
      }
      if (context?.referrerHost) body.referring_site = context.referrerHost;

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };

        if (res.ok) {
          setSuccess(true);
          posthog.capture("newsletter_submit", {
            ...context?.utm,
            sourcePlatform: context?.sourcePlatform,
            referrerHost: context?.referrerHost,
          });
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Custom provider: allow native form submit; track then submit
    setSubmitting(true);
    const context = getTrackingContext();
    posthog.capture("newsletter_submit", {
      ...context?.utm,
      sourcePlatform: context?.sourcePlatform,
      referrerHost: context?.referrerHost,
    });
    (e.currentTarget as HTMLFormElement).submit();
  };

  return (
    <section className="glass relative flex w-full min-h-[140px] flex-col justify-between overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5 dark:border-white/10 dark:from-primary/20 dark:via-accent/10">
      <div className="relative z-10 space-y-1">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/70 text-primary shadow-sm dark:bg-white/20 dark:text-primary">
            <span className="text-xs font-semibold">✉️</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            The Weekly Leaf
          </span>
        </div>
        <h2 className="text-base font-bold leading-tight text-earth dark:text-earth">
          Join the Inner Circle
        </h2>
        <p className="mt-1 text-[11px] text-earth/70 dark:text-earth/80">
          Exclusive updates about what I&apos;m building, reading, and learning.
        </p>
      </div>
      {success ? (
        <div className="relative z-10 mt-4 space-y-2">
          <p className="text-sm font-medium text-primary dark:text-primary">
            You&apos;re on the list. Check your inbox.
          </p>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setError(null);
            }}
            className="text-[11px] font-semibold text-primary/80 underline-offset-2 hover:underline dark:text-primary"
          >
            Subscribe with another email
          </button>
        </div>
      ) : (
        <form
          action={isBeehiiv ? undefined : newsletter.action}
          method={isBeehiiv ? undefined : newsletter.method ?? "POST"}
          onSubmit={handleSubmit}
          className="relative z-10 mt-4 flex flex-col gap-2 sm:flex-row"
        >
          {!isBeehiiv && newsletter.hiddenFields &&
            Object.entries(newsletter.hiddenFields).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            disabled={submitting}
            className="
          box-border h-12 w-full appearance-none rounded-xl
    bg-white/70 px-3 text-sm font-medium text-earth
    placeholder:text-earth/40

    border border-earth/15
    shadow-sm shadow-black/10

    focus:border-primary/60
    focus:ring-2 focus:ring-primary/30
    focus:outline-none

    dark:bg-white/15
    dark:border-white/20
    dark:placeholder:text-earth/50
    disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting}
            className="h-12 shrink-0 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
          >
            {submitting ? "Joining..." : "Join"}
          </button>
        </form>
      )}
      {error && (
        <p className="relative z-10 mt-2 text-[11px] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="pointer-events-none absolute -right-2 -top-2 opacity-5 dark:opacity-10">
        <span className="text-[100px]">🍃</span>
      </div>
    </section>
  );
}
