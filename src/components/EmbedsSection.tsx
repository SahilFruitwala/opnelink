import { embeds } from "../config/openlink";

export function EmbedsSection() {
  if (!embeds.length) return null;

  return (
    <section className="space-y-4 pt-2">
      <div className="flex items-center justify-center gap-2 px-4 opacity-40">
        <div className="h-[1px] flex-1 bg-earth/20" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-earth">
          Media
        </h2>
        <div className="h-[1px] flex-1 bg-earth/20" />
      </div>
      <div className="space-y-4">
        {embeds.map((embed) => (
          <div key={embed.title} className="glass group overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/30 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-earth/80 dark:text-earth/90">
                {embed.title}
              </p>
              <span className="text-[10px] font-bold text-earth/30">REC</span>
            </div>
            <div className="relative aspect-video w-full bg-earth/5">
              <iframe
                src={embed.src}
                title={embed.title}
                className="h-full w-full border-0 transition-opacity group-hover:opacity-90"
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

