# Ritz Media World

Next.js marketing site with product catalog, Razorpay checkout, AI concierge (Gemini), and admin dashboard.

## Stack

- **Next.js 16** (App Router)
- **PostgreSQL** (Neon) via `pg`
- **Razorpay** payments
- **Google Gemini** AI chat

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Fill in `.env`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection string |
| `GEMINI_API_KEY` | Google AI Studio / Gemini API key |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Server-side Razorpay |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client checkout |
| `ADMIN_USERNAME` | Dashboard login (default `admin`) |
| `ADMIN_PASSWORD` | Dashboard password (**required** for `/dashboard`) |
| `ADMIN_SESSION_SECRET` | Cookie session value (use a long random string) |

3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing homepage (dynamic stats & featured products, revalidate 60s) |
| `/products` | Catalog with server pagination, search, filters |
| `/products/[id]` | Product detail (SSR) + related products |
| `/ai` | Gemini AI assistant |
| `/checkout` | Checkout flow |
| `/dashboard` | Admin (protected by middleware) |
| `/dashboard/login` | Admin sign-in |

## API (selection)

- `GET /api/products` — Paginated products (`page`, `limit`, `search`, `category`, `sort`, `featured`)
- `GET /api/products/categories` — Distinct categories
- `POST /api/ai/chat` — AI chat (rate limited)
- `POST /api/leads` — Contact form leads
- `POST /api/auth/login` / `POST /api/auth/logout` — Dashboard session

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## CI

GitHub Actions runs `lint` and `build` on push/PR (see `.github/workflows/ci.yml`).

## Security notes

- Never commit `.env` (already in `.gitignore`).
- Set strong `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` before deploying.
- Rotate any keys that were exposed in chat or screenshots.
