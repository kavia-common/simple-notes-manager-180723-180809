# Notes Frontend — Ocean Professional

A simple Vue 3 + Vite app to manage personal notes. It features:
- Modern Ocean Professional theme (primary #2563EB, secondary #F59E0B)
- Sidebar navigation with search
- Notes list with delete
- Note editor with title/body, auto-save on blur and explicit Save
- LocalStorage persistence by default
- Pluggable data service ready for future REST API

## Run locally

```sh
npm install
npm run dev
```

The app runs at http://localhost:3000 (or the configured port).

## Structure

- src/components/AppShell.vue — Layout with sidebar + main editor area
- src/components/NotesList.vue — Notes listing with selection and deletion
- src/components/NoteEditor.vue — Editor for title/body with auto-save
- src/components/SearchBar.vue — Search input component
- src/stores/notesStore.ts — Pinia store for CRUD operations
- src/services/notesService.ts — Persistence abstraction (LocalStorage by default)
- src/assets/theme.css — Ocean Professional theme CSS variables and base styles

## Persistence

By default, notes are saved to browser localStorage under key `ocean-notes-v1`.

### Switching to a REST API later

1. Implement the methods in `RestApiStrategy` inside `src/services/notesService.ts`.
2. Export the REST strategy instead of the LocalStorage one:
   ```ts
   export const notesService: NotesStrategy = new RestApiStrategy()
   ```
3. Provide an environment variable for the base URL in `.env`:
   ```
   VITE_NOTES_API_BASE_URL=https://your-api.example.com
   ```
4. Example endpoints:
   - GET /notes — list notes
   - PUT /notes/bulk — replace/update notes in bulk
   - or create endpoints for create/update/delete individually and adapt the store.

## Accessibility & Responsiveness

- Keyboard focus styles are visible.
- Responsive layout cascades to a single column on small screens.

## Theme

Defined in `src/assets/theme.css`:
- primary: #2563EB
- secondary: #F59E0B
- error: #EF4444
- background: #f9fafb
- surface: #ffffff
- text: #111827

Smooth transitions, subtle shadows, and rounded corners provide a modern aesthetic.
