import { embeds } from "../config/openlink";

export function EmbedsSection() {
  if (!embeds.length) return null;

  return (
    <section className="space-y-3 pt-1">
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-primary">
        Featured media
      </h2>
      <div className="space-y-3">
        {embeds.map((embed) => (
          <div key={embed.title} className="glass overflow-hidden rounded-2xl border border-white/50 dark:border-white/20">
            <div className="border-b border-white/50 px-4 py-3 dark:border-white/20">
              <p className="text-sm font-bold text-earth dark:text-earth">
                {embed.title}
              </p>
            </div>
            <div className="relative aspect-video w-full bg-black/10">
              <iframe
                src={embed.src}
                title={embed.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

