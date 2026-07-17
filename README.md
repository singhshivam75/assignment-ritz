Ritz Media World — a Next.js marketing site with a lead-capture contact form and an admin dashboard for managing submitted leads, backed by PostgreSQL.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (via [`pg`](https://node-postgres.com/))
- **Icons:** lucide-react, react-icons

## Features

- Public marketing site with a contact/lead form
- Admin dashboard (`/dashboard`) with:
  - Overview page showing lead counts by status
  - Leads table with sorting (latest/oldest first) and pagination
  - Full CRUD on leads (create, edit, delete)
  - Inline editing of query status and remark

## Prerequisites

- Node.js 20+
- A PostgreSQL database (local or hosted)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
   ```

3. Create the database schema:

   ```sql
   CREATE TABLE leads (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50) NOT NULL,
     service VARCHAR(255) NOT NULL
   );

   CREATE TABLE lead_details (
     id SERIAL PRIMARY KEY,
     lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
     message TEXT,
     query_status VARCHAR(20) NOT NULL DEFAULT 'Pending'
       CHECK (query_status IN ('Pending', 'In Progress', 'Resolved', 'Closed')),
     remark TEXT,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE INDEX idx_lead_details_lead_id ON lead_details(lead_id);
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   The site runs at [http://localhost:3000](http://localhost:3000), the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Build for production                 |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## API Reference

All routes live under `src/app/api/leads`.

| Method | Route                     | Description                                  |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | `/api/leads`               | List leads. Query params: `sort` (`latest`\|`oldest`), `page`, `limit` |
| POST   | `/api/leads`               | Create a lead (`name`, `email`, `phone`, `service`, `message`) |
| GET    | `/api/leads/:id`           | Get a single lead                              |
| PUT    | `/api/leads/:id`           | Update a lead                                  |
| DELETE | `/api/leads/:id`           | Delete a lead                                  |
| PATCH  | `/api/leads/:id/status`    | Update `query_status` and `remark`             |

## Production Notes

- **Authentication:** the `/dashboard` routes and `/api/leads` endpoints are not currently protected by auth. Add an auth layer (e.g. middleware-based session check) before deploying publicly, since the API allows unauthenticated read/write/delete of all lead data.
- **Database SSL:** `src/lib/db.js` connects with `ssl: { rejectUnauthorized: false }`, suitable for most managed Postgres providers (Supabase, Neon, RDS). Adjust if your provider requires strict certificate validation.
- **Environment variables:** only `DATABASE_URL` is required. Never commit `.env` — it's already covered by `.gitignore`.

## Deployment

The app builds as a standard Next.js app and can be deployed to any Node-compatible host (Vercel, Render, Fly.io, etc.):

```bash
npm run build
npm run start
```

Ensure `DATABASE_URL` is set in the deployment environment and points to a reachable, migrated PostgreSQL database.

