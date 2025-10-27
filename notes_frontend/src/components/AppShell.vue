<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import NotesList from './NotesList.vue'
import NoteEditor from './NoteEditor.vue'
import SearchBar from './SearchBar.vue'

const store = useNotesStore()

const activeNoteId = ref<string | null>(null)
const query = ref('')

watch(
  () => store.notes.length,
  () => {
    if (store.notes.length && !activeNoteId.value) {
      activeNoteId.value = store.notes[0].id
    }
  },
  { immediate: true }
)

const filteredNotes = computed(() => {
  if (!query.value.trim()) return store.notes
  const q = query.value.toLowerCase()
  return store.notes.filter((n) => n.title.toLowerCase().includes(q))
})

function onCreateNote() {
  const newNote = store.createNote()
  activeNoteId.value = newNote.id
}

function onDeleteNote(id: string) {
  if (confirm('Delete this note? This action cannot be undone.')) {
    store.deleteNote(id)
    if (activeNoteId.value === id) {
      activeNoteId.value = store.notes[0]?.id ?? null
    }
  }
}

function onSelectNote(id: string) {
  activeNoteId.value = id
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Primary">
      <div class="brand">
        <div class="brand-logo" aria-hidden="true">📝</div>
        <div class="brand-text">
          <h1>Notes</h1>
          <span>Ocean Professional</span>
        </div>
      </div>

      <SearchBar
        v-model="query"
        placeholder="Search notes…"
        class="mb-2"
        aria-label="Search notes by title"
      />

      <button class="btn btn-primary mb-2" @click="onCreateNote" aria-label="Create new note">
        + New Note
      </button>

      <NotesList
        :notes="filteredNotes"
        :active-id="activeNoteId"
        @select="onSelectNote"
        @delete="onDeleteNote"
      />
      <div class="sidebar-footer" aria-hidden="true">
        <small>Local storage active</small>
      </div>
    </aside>

    <main class="content">
      <header class="content-header">
        <div class="header-left">
          <h2 v-if="activeNoteId">Edit Note</h2>
          <h2 v-else>No note selected</h2>
        </div>
        <div class="header-right">
          <button
            class="btn btn-secondary"
            @click="onCreateNote"
            aria-label="Create a new note from header"
          >
            New
          </button>
        </div>
      </header>

      <section class="editor-section">
        <NoteEditor v-if="activeNoteId" :note-id="activeNoteId" />
        <div v-else class="empty-state" role="status">
          <p>Select a note to start editing or create a new note.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px 12px;
  border-bottom: 1px dashed var(--border);
  margin-bottom: 8px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(243,244,246,1));
  color: var(--primary);
  font-size: 20px;
}

.brand-text h1 {
  font-size: 18px;
  margin: 0;
}
.brand-text span {
  display: block;
  color: var(--muted);
  font-size: 12px;
}

.sidebar-footer {
  margin-top: auto;
  color: var(--muted);
  padding-top: 8px;
  border-top: 1px dashed var(--border);
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background:
    radial-gradient(1200px 400px at -200px -200px, rgba(37,99,235,0.06), transparent 60%),
    radial-gradient(1200px 400px at 120% 120%, rgba(37,99,235,0.04), transparent 60%),
    var(--bg);
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(37,99,235,0.06), transparent);
}
.header-left h2 {
  margin: 0;
  font-size: 18px;
}

.editor-section {
  padding: 16px;
  height: calc(100vh - 66px);
  overflow: auto;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
}
.btn:focus {
  outline: 2px solid var(--primary-20);
  outline-offset: 2px;
}
.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.2);
}
.btn-primary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}
.btn-secondary {
  background: var(--secondary);
  color: #1f2937;
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.2);
}
.btn-secondary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.empty-state {
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--muted);
  border: 1px dashed var(--border);
  border-radius: 16px;
  background: var(--surface);
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: 2;
    border-right: none;
    border-top: 1px solid var(--border);
  }
  .content {
    order: 1;
  }
}
</style>
