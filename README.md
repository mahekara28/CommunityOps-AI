# Narrative Gap MCP

Narrative Gap MCP is a GitHub-backed product for DevRel, developer marketing, product marketing, and platform teams that need to understand one thing clearly: where the story they tell about an API, SDK, developer tool, or AI product stops matching what developers are actually experiencing.

Instead of treating GitHub activity as a raw analytics stream, the product turns issues, pull requests, contributor behavior, and docs-related signals into a structured review surface for mismatch detection, repair planning, onboarding improvement, and proof packaging.

## What the product does

The platform helps teams answer practical questions such as:

- Are we promising an easier setup than API or SDK users are actually experiencing?
- Are support issues revealing gaps in the way the product is explained?
- Are shipped fixes and improvements becoming visible proof, or staying buried in pull requests?
- Which questions keep repeating because the message, docs, or onboarding flow is unclear?
- What should the team fix first to reduce narrative drift?

## Product areas

### Briefing

A high-level summary of alignment, friction, onboarding truth, and proof clarity across tracked developer products.

### Gap Map

A focused surface for reviewing the strongest mismatches between positioning and developer reality.

### Repair Plans

An action-oriented layer that turns live evidence into concrete repair steps for docs, messaging, onboarding, and proof assets.

### Sources

A source-management page for repository mapping, token setup, positioning inputs, and evidence refresh controls.

### Narrative Detail

A deeper product view for reviewing findings, repair opportunities, signal owners, raw evidence, and change over time.

## How it works

1. A repository is connected through the Sources page.
2. The backend pulls live GitHub data.
3. Repository activity is transformed into narrative-gap findings, repair recommendations, and proof opportunities.
4. The frontend presents the results through dedicated review pages designed for DevRel and product go-to-market workflows.

The current implementation uses repository metadata, issues, pull requests, contributor activity, and docs-adjacent proxy signals to generate the analysis.

## Architecture

Narrative Gap MCP is built as a full-stack application with a clear split between ingestion, analysis, and presentation.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Pydantic
- SQLite
- HTTPX

## Repository structure

```text
backend/
  app/
    agents/         # summary and narrative brief generation
    analysis/       # signal building, repair planning, topic clustering
    api/            # FastAPI route layer
    core/           # database and shared backend setup
    ingestion/      # GitHub ingestion services
    models/         # backend schemas
    services/       # orchestration and sync workflows
  main.py
  requirements.txt

frontend/
  app/              # Next.js App Router pages
  components/       # reusable UI components
  lib/              # frontend data and API helpers
```

## Local development

### Prerequisites

- Python 3.11 or newer
- Node.js 18 or newer
- npm
- GitHub Personal Access Token for live API access

### Environment variable

Set a GitHub token before starting the backend:

```powershell
$env:GITHUB_TOKEN="your_github_token"
```

Using a token is recommended so GitHub requests remain reliable and less likely to hit rate limits.

## Running the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8010
```

Backend endpoint:

```text
http://127.0.0.1:8010
```

Health check:

```text
http://127.0.0.1:8010/api/health
```

## Running the frontend

Open a second terminal:

```powershell
cd frontend
$env:NEXT_PUBLIC_API_BASE_URL="http://127.0.0.1:8010"
npm install
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Frontend endpoint:

```text
http://127.0.0.1:3001
```

## Setup flow

1. Start the backend service.
2. Start the frontend application.
3. Open the application in the browser.
4. Navigate to **Sources**.
5. Enter the GitHub repository owner and repository name.
6. Save the repository mapping.
7. Refresh evidence.
8. Review the results across Briefing, Gap Map, Repair Plans, and Narrative Detail.

## API surface

Primary backend routes:

- `GET /`
- `GET /api/health`
- `GET /api/communities`
- `GET /api/communities/{slug}`
- `PATCH /api/communities/{slug}`
- `GET /api/dashboard/{slug}`
- `POST /api/sync/{slug}`

## Product direction

This project is designed to move beyond basic repository analytics. Its purpose is to help teams detect narrative drift early and repair it before it turns into support load, onboarding confusion, weak launches, lost developer trust, or slower adoption.

In a fuller MCP implementation, the GitHub source layer can expand to include documentation systems, changelogs, support tools, and richer multi-source review workflows.

## License

This project is released under the MIT License.
