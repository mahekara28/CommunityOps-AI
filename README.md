# CommunityOps AI

CommunityOps AI is a full-stack DevRel and community intelligence product for teams that need more than vanity metrics.

It helps community, developer marketing, and open-source teams understand:
- support pressure
- contributor momentum
- activation health
- content opportunities
- champion activity
- proof-oriented ROI signals

The product is designed as a multi-page experience, not a single dashboard dump.

## Product Overview

CommunityOps AI combines a FastAPI backend with a Next.js frontend to create a cleaner operating surface for modern community teams.

Core product goals:
- turn raw GitHub activity into operator-friendly signals
- highlight where support is slowing growth
- surface content themes from recurring developer questions
- identify advocacy and champion opportunities
- help teams connect community work to visible product and business proof

## Current Pages

- `/` : portfolio overview
- `/communities/[slug]` : individual community detail
- `/signals` : signal desk across communities
- `/playbooks` : recommended actions and workflow lanes
- `/settings` : repo sync and community configuration

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: FastAPI, Pydantic, SQLite
- Data sources: seeded demo data plus live GitHub-backed sync flow

## Project Structure

```text
backend/
  app/
    agents/         # summary and brief generation
    analysis/       # signals, recommendations, topic clustering, health scoring
    api/            # FastAPI routes
    core/           # database initialization and shared backend utilities
    ingestion/      # GitHub ingestion and demo fallback
    models/         # shared backend schemas
    services/       # repository and dashboard orchestration
  main.py

frontend/
  app/              # App Router pages
  components/       # reusable UI blocks
  lib/              # API utilities, mock data, server-side data helpers
```

## Key Features

- Multi-page product UI with a cleaner navigation shell
- Portfolio-level overview across multiple communities
- Individual community detail pages
- GitHub repo configuration from the UI
- Demo mode and live sync mode
- Benchmark metrics for activation, support, and ROI
- Signal feed for changing community conditions
- Playbooks for operator action and planning
- Settings page for repo owner, repo name, docs URL, token env var, and sync mode

## Backend API

Main routes:

- `GET /api/health`
- `GET /api/communities`
- `GET /api/communities/{slug}`
- `PATCH /api/communities/{slug}`
- `GET /api/dashboard/{slug}`
- `POST /api/sync/{slug}`

## Local Setup

### 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

For a production-style local run:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Frontend runs on:

```text
http://127.0.0.1:3000
```

## Live GitHub Sync

The app supports two modes:

- `demo` : uses seeded workspace data
- `live` : attempts to sync from GitHub

To use live mode:

1. Open the Settings page.
2. Choose a community.
3. Set `repo_owner` and `repo_name`.
4. Keep or change the token env var name, usually `GITHUB_TOKEN`.
5. Switch sync mode to `live`.
6. Save config.
7. Run sync.

If the token is available in your environment, the backend will try to fetch:
- repository metadata
- contributors
- issues
- pull requests

If live fetching fails, the product gracefully falls back to demo behavior.

## Environment Variable

Optional:

```bash
GITHUB_TOKEN=your_github_token
```

This improves GitHub API reliability and rate limits for live sync.

## Design Direction

The interface is intentionally built to feel more like a modern B2B product than a student dashboard.

Design choices include:
- softer premium surfaces
- restrained color usage
- reduced filler copy
- multi-page separation of concerns
- subtle motion only where it improves feel and clarity

## Current Status

Implemented:
- backend API and SQLite persistence
- multi-page frontend shell
- portfolio overview
- community detail views
- settings and sync configuration panel
- live/demo ingestion structure
- signal and recommendation system

Still good next steps:
- richer charting and data visualizations
- live champion scoring from real contributor data
- stronger issue and discussion classification
- auth and multi-user workspace support
- exportable reports for leadership or marketing teams

## Validation

Verified during setup:
- backend compile checks pass
- frontend build passes
- frontend lint passes
- key local routes return successful responses

## License

Add your preferred license here.
