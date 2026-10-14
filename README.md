# Lami Ventures LLC — website

Company and partnership site for Lami Ventures LLC: two divisions (Digital Solutions; Commerce & Resale), a partnerships page, an About page, a contact form, and a draft privacy notice. Not a store: no cart, accounts, or inventory.

**Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Motion, Zod, Resend, Upstash Ratelimit.

## Local setup

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build && npm start
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public URL, no trailing slash. Used for canonical URLs, sitemap, robots, social previews, structured data, and the form's origin check. Falls back to `http://localhost:3000`. |
| `RESEND_API_KEY` | For the form | Resend API key. |
| `CONTACT_TO_EMAIL` | For the form | Inbox that receives inquiries (comma-separate for several). |
| `CONTACT_FROM_EMAIL` | For the form | Sender on a domain verified in Resend, e.g. `Lami Ventures Website <website@yourdomain.com>`. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Recommended | Shared rate limiting across serverless instances. |
| `RATE_LIMIT_SALT` | Recommended | Random string used to hash IPs before rate limiting (`openssl rand -hex 32`). |

Secrets are read only on the server. Never commit `.env.local`.

## Contact form

- Form → Server Action (`src/app/contact/actions.ts`) → Resend, as a **plain-text** email with `Reply-To` set to the sender.
- Server-side Zod validation with length limits (`src/lib/contact/schema.ts`). Line breaks and control characters are rejected in single-line fields, which prevents email-header injection.
- Spam and abuse controls: a hidden honeypot field, a minimum fill time, and IP rate limiting (5 per 10 minutes; IPs are hashed). Upstash is used when configured; otherwise a per-instance in-memory limiter is used (best effort only on serverless).
- Origin checks: Next.js rejects Server Action requests whose `Origin` doesn't match the host, and the action also checks against `NEXT_PUBLIC_SITE_URL`.
- Message contents are never logged. Users see safe, specific errors.
- **If Resend isn't configured, the form says so on the page and refuses submissions. It never shows a fake success.** The success state appears only after Resend accepts the email.
- Deep links preselect the inquiry type: `/contact?inquiry=digital|partnership|resale|general`.
- Works without JavaScript (native form post to the Server Action).

To configure: create a Resend account, verify your sending domain, create an API key, and set the three `RESEND_`/`CONTACT_` variables. Then send a test message from the deployed site.

## Security notes

- Per-request nonce CSP in `src/proxy.ts` (`script-src 'self' 'nonce-…' 'strict-dynamic'`). Styles allow `'unsafe-inline'` because React and Motion set style attributes. Because of the nonce, every page renders dynamically. That's why `cacheComponents` is off.
- Other headers (HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP) are in `next.config.ts`.
- No analytics, trackers, or cookies. Fonts are self-hosted via `next/font`.
- `npm audit` reports advisories in ESLint's dev-only dependency tree (`braces` via `eslint-config-next`). Nothing in the production bundle is affected; recheck when `eslint-config-next` updates.

These measures reduce risk. They don't make the site "fully secure"; keep dependencies updated.

## Deployment

Vercel is the simplest option (Node runtime; Proxy and Server Actions work out of the box):

1. Import the repository in Vercel.
2. Add the environment variables above for Production (and Preview if wanted).
3. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.
4. Submit a test inquiry and confirm it arrives.

Any host that runs `next start` on Node 20.9+ also works. Behind a reverse proxy, make sure `Host`/`X-Forwarded-Host` and `X-Forwarded-For` are passed through.

## Owner-supplied details (before launch)

All company details live in **`src/config/site.ts`**. Anything set to `null` is hidden from the site and structured data. Nothing has been invented.

- [ ] Production domain → `NEXT_PUBLIC_SITE_URL`
- [ ] Public business email (optional) → `contact.email`
- [ ] Phone (optional) → `contact.phone`
- [ ] Mailing address (optional) → `contact.address`
- [ ] Social profiles (optional) → `social`
- [ ] Privacy notice: `privacy.hostingProvider`, `privacy.retentionPeriod`, `privacy.contactEmail` (optional), `privacy.jurisdiction` (optional), and finally `privacy.effectiveDate`. Until `effectiveDate` is set, `/privacy` shows a "Draft" notice and bracketed placeholders.
- [ ] Have the privacy notice reviewed for your jurisdiction. It describes the actual form processing (Resend, hosting, optional Upstash), but it is not legal advice.
- [ ] Resend account with a verified sending domain.
- [ ] Optional: Upstash Redis database for rate limiting.

## Project structure

```
src/
  app/                 routes, metadata files (sitemap, robots, icon, OG image)
    contact/actions.ts contact Server Action
  components/          layout, ui, visuals, home, contact
  config/site.ts       company details + navigation + inquiry types
  lib/contact/         schema, email delivery, rate limiting
  proxy.ts             CSP nonce
```
