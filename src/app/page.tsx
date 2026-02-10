import { ProfileHeader } from "../components/ProfileHeader";
import { SocialRow } from "../components/SocialRow";
import { FeaturedLinks, LinkList } from "../components/Links";
import { NewsletterForm } from "../components/NewsletterForm";
import { EmbedsSection } from "../components/EmbedsSection";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center text-earth">
      <main className="relative flex h-full min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden pb-24">
        <div className="sticky top-0 z-20 flex items-center justify-end px-4 py-3">
          <ThemeToggle />
        </div>

        <ProfileHeader />

        <div className="space-y-3 px-4">
          <SocialRow />
          <FeaturedLinks />
          <LinkList />

          <NewsletterForm />
          <EmbedsSection />
        </div>
      </main>
    </div>
  );
}

