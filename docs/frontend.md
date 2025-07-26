# Frontend (Next.js)

The `src/` directory houses the Next.js code. Important subfolders:

- `src/app` – new Next.js app router pages.
  - `page.js` – landing page.
  - `layout.js` – global layout and font configuration.
  - `components/` – shared React components such as the multi-step form.
  - `forms/` – classic single-page candidate form used in tests.
  - `admin/` – administrative UI for searching and editing candidates.
  - `POC/` – proof‑of‑concept route rendering `FounditForm`.

Testing for the frontend is done with Jest and React Testing Library. Run `npm test` to execute the suite.
