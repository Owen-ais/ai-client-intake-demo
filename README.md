# AI Client Intake Demo App

A small Next.js demo app for showing how a business can turn client/enquiry answers into:

- a client summary
- key needs/problems
- priority level
- suggested next step
- missing information
- follow-up email draft

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

3. Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

4. Run locally:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Important safety notes

- The app creates drafts only.
- A human should review outputs before sending them to clients.
- Do not paste passwords, recovery codes, secret keys, or sensitive credentials.
- This is a demo app, not a full CRM or production SaaS.
