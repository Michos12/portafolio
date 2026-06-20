# Deployment Guide

Decoupled deploy: **backend → Render**, **frontend → Vercel**, **database → Supabase**
(already set up). Follow the steps in order — the URLs depend on each other.

> The free Render tier sleeps after 15 min of inactivity (~50s cold start on the next
> visit). Phase 4 adds a keep-alive cron to mitigate this.

---

## 0. Push the code to GitHub

```bash
# from the project root (git is already initialized with an initial commit)
git remote add origin https://github.com/Michos12/portafolio.git
git push -u origin main
```
Create the empty `portafolio` repo on GitHub first (without a README).

---

## 1. Backend → Render (via Blueprint)

1. Render dashboard → **New +** → **Blueprint** → connect your GitHub repo.
2. Render reads [`render.yaml`](render.yaml) and proposes the **portfolio-api** service.
   Click **Apply**.
3. Fill in the secret env vars (the ones marked `sync: false`) under the service's
   **Environment** tab:

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | your Supabase project URL |
   | `SUPABASE_KEY` | your Supabase secret key (`sb_secret_…`) |
   | `ADMIN_USERNAME` | e.g. `admin` |
   | `ADMIN_PASSWORD_HASH` | bcrypt hash (see below) |
   | `GITHUB_TOKEN` | optional (raises GitHub rate limit) |
   | `FRONTEND_ORIGIN` | **leave for step 3** |

   `JWT_SECRET` is generated automatically by Render. `GITHUB_USERNAME` is already
   set to `Michos12` in the blueprint.

   Generate the admin password hash locally:
   ```bash
   python -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt()).decode())"
   ```
4. Wait for the deploy to finish. Note the backend URL, e.g.
   `https://portfolio-api.onrender.com`.
5. Smoke test: open `https://portfolio-api.onrender.com/api/health` → `{"status":"ok"}`.

---

## 2. Point the frontend at the backend

Edit [`frontend/src/environments/environment.prod.ts`](frontend/src/environments/environment.prod.ts)
and set the real Render URL:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.onrender.com/api',
};
```
Commit and push:
```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Point frontend to production API"
git push
```

---

## 3. Frontend → Vercel

1. Vercel dashboard → **Add New** → **Project** → import the same GitHub repo.
2. **Root Directory:** `frontend`.
3. Vercel auto-detects Angular. The included [`frontend/vercel.json`](frontend/vercel.json)
   sets the build command, output directory (`dist/frontend/browser`) and the SPA
   rewrite (so deep links like `/projects` don't 404).
4. Deploy. Note the frontend URL, e.g. `https://portafolio-michos12.vercel.app`.

---

## 4. Close the CORS loop

Back on **Render**, set the `FRONTEND_ORIGIN` env var to your Vercel domain:
```
FRONTEND_ORIGIN=https://portafolio-michos12.vercel.app
```
(Comma-separate multiple origins if needed.) Save → Render redeploys automatically.

---

## 5. Verify end to end

- Open the Vercel URL → Home renders.
- `/projects` → projects load from the API; reload the page → no 404 (SPA rewrite works).
- `/contact` → submit a message → check the `messages` table in Supabase.
- `/admin` → sign in → create/edit a project → it appears on `/projects`.
- Confirm no secrets leaked into the frontend bundle (DevTools → Network/Sources;
  only `apiUrl` should be visible).

---

## CI/CD

Both platforms auto-deploy on every push to `main` (Render via `autoDeploy: true`,
Vercel by default). Backend changes redeploy on Render; frontend changes on Vercel.

---

## Keep-alive (anti cold-start)

The Render free tier sleeps after 15 min of inactivity, adding a ~50s cold start on
the next visit. [`.github/workflows/keep-alive.yml`](.github/workflows/keep-alive.yml)
pings `/api/health` every 10 minutes via GitHub Actions to keep the instance warm.

Notes:
- Scheduled workflows run only from the **default branch** (`main`).
- GitHub disables scheduled workflows after **60 days of repo inactivity**; any push
  re-enables them.
- You can trigger it manually from the repo's **Actions** tab (workflow_dispatch).
- If you'd rather conserve Render's free monthly hours, narrow the cron to your
  active hours (e.g. `*/10 6-23 * * *`).
