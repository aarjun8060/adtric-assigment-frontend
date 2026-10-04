# The Manthan School — News, Events & Admissions

The public website and school administration frontend for The Manthan School. Visitors can browse published school updates and send admission enquiries. School administrators can manage News & Events and review enquiries.

## Features

- Responsive school website with an event diary, News & Events listing, and article pages.
- API-backed category filters and pagination for published stories.
- Admission enquiry form with field-level validation and submission feedback.
- Separate school admin sign-in at `/admin/login`.
- Admin News & Events create, edit, publish, and delete screens.
- Admin enquiry list with status filtering, pagination, CRM delivery results, and CRM retry.
- Admin JWT stored in an HttpOnly cookie; requests to protected API endpoints are proxied through Next.js route handlers.

## Routes

| Route | Description |
|---|---|
| `/` | School event diary and admission enquiry form |
| `/event-diary` | Event diary |
| `/news-events` | Published stories, categories, and pagination |
| `/news-events/[slug]` | Published article details |
| `/enquiry` | Admission enquiry form |
| `/admin/login` | School administrator sign-in |
| `/admin/news-events` | Manage News & Events |
| `/admin/news-events/new` | Create a News & Events item |
| `/admin/news-events/[id]/edit` | Edit a News & Events item |
| `/admin/enquiries` | Review and update admission enquiries |

## Stack

- Next.js 15.5, React 19, and TypeScript
- Tailwind CSS 4, Radix UI, and Lucide icons
- React Hook Form and Zod
- Express API with MongoDB and Mongoose (in `../api`)

## Requirements

- Node.js 18.18 or later
- npm
- MongoDB, configured for the API

## Local development

From the repository root, run the API and frontend in separate terminals.

### 1. Configure and start the API

```bash
cd api
npm install
cp .env.sample .env
```

Set at least `MONGODB_URL` and `ADMIN_JWT_SECRET` in `api/.env`. To seed the initial administrator, also set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `ADMIN_NAME`.

```bash
npm run seed:admin
npm run seed:school-data
npm run dev
```

The API listens on `http://localhost:5000` by default. `seed:school-data` inserts sample News & Events and demo enquiries when they are missing; use it for local or development databases.

### 2. Configure and start the frontend

In `web/.env.local`, set the API origin:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then run:

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API origin should be the base URL only; frontend requests add `/api/v1` as needed.

## Scripts

```bash
npm run dev       # Start the Next.js development server
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run Next.js ESLint checks
npm run format    # Format files with Prettier
```

## API and environment

The frontend reads `NEXT_PUBLIC_API_URL` for public News & Events and enquiry requests, and for the server-side admin API proxy. The API environment variables, admin seeding, CRM webhook setup, and REST endpoints are documented in [the API README](../api/README.md).

For local development, allow the frontend origin in the API's `CORS_ORIGIN`, for example:

```env
CORS_ORIGIN=http://localhost:3000
```

## Deployment

Deploy the frontend and API as separate Vercel projects:

1. Set the frontend project's Root Directory to `web`.
2. Set the API project's Root Directory to `api`.
3. In the frontend project, set `NEXT_PUBLIC_API_URL` to the deployed API origin, without `/api/v1`.
4. In the API project, configure its environment variables as described in [the API README](../api/README.md), including `CORS_ORIGIN` with the deployed frontend origin.

The API currently writes uploaded News & Events images to its local filesystem. Vercel function files are not persistent storage, so configure durable object storage before relying on image uploads in production.

## Repository layout

```text
adtric-assignment/
├── api/       Express API, database models, routes, and seed scripts
└── web/       Next.js public website and school admin frontend
```
