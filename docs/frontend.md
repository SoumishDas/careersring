# Frontend (Next.js)

The frontend is located in the `src/` directory and uses the Next.js App Router. Key folders include:

- `src/app` – entry point for all pages.
  - `page.js` – landing page showing a basic index.
  - `layout.js` – global layout, fonts and `globals.css` imports.
  - `components/` – reusable React components. Notably `MultiStepForm/` implements an 18 step wizard for candidate intake.
  - `forms/` – a simpler `candidateForm.jsx` used in testing.
  - `admin/` – admin pages for searching and editing stored candidates.
  - `POC/` – proof of concept route for the `FounditForm` component.

React Hook Form drives all form state and validation. Material UI (`@mui/*`) provides styling.

To start the development server run:
```bash
npm run dev
```
Hot reloading is enabled by default. Tests live in `__tests__/` and can be executed with `npm test`.
