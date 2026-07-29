# StockPilot — Inventory Management System

A complete full-stack inventory management application built for DevOps practice:

- **Frontend:** AngularJS 1.8.3 (ngRoute, ngResource), Bootstrap 5, custom design system
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (JSON Web Tokens), bcrypt password hashing, role-based access (admin/staff)

No Dockerfiles are included on purpose — this project is meant to be containerized,
orchestrated, and deployed by you as DevOps practice.

```
stockpilot/
├── backend/     Node.js/Express REST API + MongoDB models
└── frontend/    AngularJS single-page application (static files)
```

---

## 1. Prerequisites

- Node.js 18+ and npm
- MongoDB running locally, in a container, or a hosted instance (e.g. MongoDB Atlas)

## 2. Backend setup

```bash
cd backend
cp .env.example .env      # then edit .env — at minimum set JWT_SECRET and MONGO_URI
npm install
npm run seed               # optional: populates demo categories/products/users
npm run dev                 # starts on http://localhost:5000 (nodemon, auto-reload)
# or: npm start             # production start (no auto-reload)
```

Demo credentials created by `npm run seed`:

| Role  | Email                | Password    |
|-------|-----------------------|-------------|
| admin | admin@stockpilot.io   | Admin@123   |
| staff | staff@stockpilot.io   | Staff@123   |

Health check: `GET http://localhost:5000/healthz`

## 3. Frontend setup

```bash
cd frontend
npm install                 # also copies AngularJS/Bootstrap into src/vendor
npm start                   # serves src/ at http://localhost:8080 via http-server
```

The frontend calls the API at the URL defined in
`frontend/src/app/app.config.js` (`API_BASE_URL` constant, default
`http://localhost:5000/api`). Update this value for staging/production
deployments, or template it out in your CI/CD pipeline.

Open `http://localhost:8080` and log in with the demo credentials above
(after running the backend's seed script).

---

## 4. REST API reference

All endpoints are prefixed with `/api`. Protected routes require
`Authorization: Bearer <token>`.

| Method | Endpoint                     | Access        | Description                        |
|--------|-------------------------------|---------------|-------------------------------------|
| POST   | `/auth/register`              | Public        | Create a new user account          |
| POST   | `/auth/login`                 | Public        | Authenticate, returns JWT           |
| GET    | `/auth/me`                    | Authenticated | Get current user profile            |
| GET    | `/categories`                 | Authenticated | List all categories                 |
| POST   | `/categories`                 | admin/staff   | Create a category                   |
| GET    | `/categories/:id`              | Authenticated | Get one category                    |
| PUT    | `/categories/:id`               | admin/staff   | Update a category                   |
| DELETE | `/categories/:id`               | admin only    | Delete a category (blocked if in use)|
| GET    | `/products`                    | Authenticated | List products (search/filter/paginate) |
| POST   | `/products`                    | admin/staff   | Create a product                    |
| GET    | `/products/:id`                 | Authenticated | Get one product                     |
| PUT    | `/products/:id`                  | admin/staff   | Update a product                    |
| DELETE | `/products/:id`                  | admin only    | Delete a product                    |
| GET    | `/products/stats/summary`         | Authenticated | Dashboard summary stats             |

Query params for `GET /products`: `search`, `category`, `lowStock=true`, `page`, `limit`.

---

## 5. Environment variables (backend)

See `backend/.env.example` for the full list: `NODE_ENV`, `PORT`, `MONGO_URI`,
`JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, `RATE_LIMIT_WINDOW_MS`,
`RATE_LIMIT_MAX_REQUESTS`.

---

## 6. Suggested DevOps practice path

1. **Dockerfiles** — write one for `backend/` (Node base image, `npm ci`,
   expose port 5000) and one for `frontend/` (multi-stage: `npm install`
   in a Node stage to run `copy-vendor.js`, then copy `src/` into an
   Nginx image to serve statically).
2. **Manual container runs** — run MongoDB, backend, and frontend as three
   separate containers on a shared Docker network; verify the flow with
   `curl` and a browser before automating anything.
3. **docker-compose** — wire the three services together with named
   volumes for MongoDB data persistence.
4. **CI/CD with Jenkins** — build → test → push images to a registry
   (Docker Hub / ECR / GHCR / Nexus) → deploy.
5. **Kubernetes** — Deployments for frontend/backend, a StatefulSet +
   PersistentVolumeClaim for MongoDB, Services, an Ingress for the
   frontend, ConfigMaps/Secrets for env vars, and liveness/readiness
   probes against `/healthz` (backend) and `/` (frontend).

Good luck with the pipeline — the `/healthz` endpoint on the backend and
plain static file serving on the frontend are both deliberately simple so
they're easy to wire into probes and load balancer health checks.
