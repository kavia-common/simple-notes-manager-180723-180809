import type { Note } from '@/stores/notesStore'

/**
 * NotesService provides a pluggable persistence layer.
 *
 * Default: LocalStorageStrategy (no backend required).
 * Future: switch to RestApiStrategy and configure baseURL + endpoints.
 */

const STORAGE_KEY = 'ocean-notes-v1'

interface NotesStrategy {
  list(): Promise<Note[]>
  save(notes: Note[]): Promise<void>
}

/**
 * LocalStorageStrategy: persists notes to browser localStorage.
 */
class LocalStorageStrategy implements NotesStrategy {
  async list(): Promise<Note[]> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed: Note[] = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  async save(notes: Note[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }
}

/**
 * RestApiStrategy: placeholder for future backend integration.
 * To enable:
 * 1) Set NOTES_API_BASE_URL in your environment and use it here.
 * 2) Implement the list() and save() methods against your API.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class RestApiStrategy implements NotesStrategy {
  // Example:
  // private baseURL = import.meta.env.VITE_NOTES_API_BASE_URL || 'http://localhost:8000/api';
  async list(): Promise<Note[]> {
    // const res = await fetch(`${this.baseURL}/notes`)
    // if (!res.ok) throw new Error('Failed to fetch notes')
    // return res.json()
    throw new Error('REST API strategy not implemented yet.')
  }

  async save(): Promise<void> {
    // Example optimization:
    // await fetch(`${this.baseURL}/notes/bulk`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_notes)
    // })
    throw new Error('REST API strategy not implemented yet.')
  }
}

/**
/ PUBLIC_INTERFACE
 */
export const notesService: NotesStrategy = new LocalStorageStrategy()

/**
 * PUBLIC_INTERFACE
 * To switch to REST API later:
 *  - Replace the above export with: `export const notesService: NotesStrategy = new RestApiStrategy()`
 *  - Implement the methods in RestApiStrategy and set VITE_NOTES_API_BASE_URL in your .env
 */
