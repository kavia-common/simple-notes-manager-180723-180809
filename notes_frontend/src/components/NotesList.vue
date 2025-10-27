<script setup lang="ts">
import { computed } from 'vue'
import type { Note } from '@/stores/notesStore'

const props = defineProps<{
  notes: Note[]
  activeId: string | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'delete', id: string): void
}>()

const sorted = computed(() =>
  [...props.notes].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
)
</script>

<template>
  <div class="list" role="list" aria-label="Notes list">
    <button
      v-for="note in sorted"
      :key="note.id"
      role="listitem"
      class="item"
      :class="{ active: note.id === activeId }"
      @click="emit('select', note.id)"
      :aria-current="note.id === activeId ? 'true' : undefined"
    >
      <div class="title-line">
        <span class="title">{{ note.title || 'Untitled' }}</span>
        <span class="time">{{ new Date(note.updatedAt ?? note.createdAt).toLocaleString() }}</span>
      </div>
      <div class="preview">{{ (note.body || '').slice(0, 80) }}</div>

      <div class="actions">
        <button
          class="icon danger"
          title="Delete note"
          aria-label="Delete note"
          @click.stop="emit('delete', note.id)"
        >
          🗑
        </button>
      </div>
    </button>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}
.item {
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  transition: all 160ms ease;
  position: relative;
}
.item:hover {
  border-color: var(--primary-30);
  box-shadow: 0 6px 16px rgba(17, 24, 39, 0.05);
  transform: translateY(-1px);
}
.item.active {
  border-color: var(--primary);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
}
.title-line {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-weight: 700;
  color: var(--text);
}
.time {
  color: var(--muted);
  font-size: 12px;
}
.preview {
  color: var(--muted);
  margin-top: 4px;
  font-size: 13px;
}
.actions {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
.icon {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
}
.icon:hover {
  background: rgba(0, 0, 0, 0.04);
}
.icon.danger:hover {
  color: var(--error);
}
</style>
