This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### PostHog analytics

To enable [PostHog](https://posthog.com) analytics, set in `.env.local` (see `.env.example`):

- `NEXT_PUBLIC_POSTHOG_KEY` — Project API key from PostHog (Project settings).
- `NEXT_PUBLIC_POSTHOG_HOST` — Optional; defaults to `https://app.posthog.com` (use for EU or self-hosted).

When configured, the app sends: pageviews (with UTM/referrer), link clicks (`openlink_click`), newsletter signups (`newsletter_submit`), and theme toggles (`theme_toggle`). Autocapture is enabled for additional interactions.

### Newsletter (Beehiiv)

To enable the newsletter signup form with [Beehiiv](https://beehiiv.com), set these in `.env.local` (see `.env.example`):

- `BEEHIIV_API_KEY` — Bearer token from Beehiiv (Dashboard → Settings → API).
- `BEEHIIV_PUBLICATION_ID` — Your publication ID (e.g. `pub_xxxx`).

If either is missing, the form is hidden and `POST /api/newsletter` returns 503.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
