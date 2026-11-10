# Velocity Map

Skoodio's build-and-release workflow mapped on the X → Y → Z → 0 velocity scale.

- `index.html` is the whole site (no build step). Vercel deploys every push to `main`.
- `tests/` holds the automated gate: a headless Chrome check that runs in GitHub Actions on every push.
- To change the page, ask Claude. It edits `index.html`, commits to `main`, the check runs, and Vercel publishes.
