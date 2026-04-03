# Contributing

## Setup

```bash
npm install
cp .env.example .env
npm start
```

## Guidelines

- Keep UI simple and responsive (mobile-first).
- Prefer small, reusable components in `src/components`.
- Put Firebase calls in `src/services` (not in pages).
- Avoid committing secrets (never commit `.env`).

## Pull requests

- Include a short summary and screenshots/GIFs for UI changes.
- Make sure `npm run build` succeeds.

