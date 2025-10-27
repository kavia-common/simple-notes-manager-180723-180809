import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { notesService } from '@/services/notesService'

export type Note = {
  id: string
  title: string
  body: string
  createdAt: number
  updatedAt?: number
}

type CreatePayload = Partial<Pick<Note, 'title' | 'body'>>
type UpdatePayload = Partial<Pick<Note, 'title' | 'body'>>

// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', () => {
  /**
   * Notes state is kept in-memory and persisted through the notesService (localStorage by default).
   */
  const state = reactive<{ notes: Note[] }>({
    notes: [],
  })

  async function load() {
    state.notes = await notesService.list()
  }

  function getById(id: string): Note | undefined {
    return state.notes.find((n) => n.id === id)
  }

  function createNote(payload: CreatePayload = {}) {
    const now = Date.now()
    const note: Note = {
      id: crypto.randomUUID(),
      title: payload.title ?? 'Untitled',
      body: payload.body ?? '',
      createdAt: now,
      updatedAt: now,
    }
    state.notes.unshift(note)
    notesService.save(state.notes)
    return note
  }

  function updateNote(id: string, payload: UpdatePayload) {
    const n = getById(id)
    if (!n) return
    if (typeof payload.title === 'string') n.title = payload.title
    if (typeof payload.body === 'string') n.body = payload.body
    n.updatedAt = Date.now()
    notesService.save(state.notes)
  }

  function deleteNote(id: string) {
    const idx = state.notes.findIndex((n) => n.id === id)
    if (idx >= 0) {
      state.notes.splice(idx, 1)
      notesService.save(state.notes)
    }
  }

  // eager load on store creation
  load()

  return {
    notes: state.notes,
    load,
    getById,
    createNote,
    updateNote,
    deleteNote,
  }
})
