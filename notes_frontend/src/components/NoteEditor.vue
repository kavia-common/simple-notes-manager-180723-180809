<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const props = defineProps<{ noteId: string }>()
const store = useNotesStore()

const localTitle = ref('')
const localBody = ref('')

const note = computed(() => store.getById(props.noteId))

watch(
  note,
  (n) => {
    localTitle.value = n?.title ?? ''
    localBody.value = n?.body ?? ''
  },
  { immediate: true }
)

function save() {
  if (!note.value) return
  store.updateNote(props.noteId, {
    title: localTitle.value,
    body: localBody.value,
  })
}

function onBlurSave() {
  // auto-save on blur
  save()
}

onMounted(() => {
  // ensure local state matches note on mount
  if (note.value) {
    localTitle.value = note.value.title ?? ''
    localBody.value = note.value.body ?? ''
  }
})
</script>

<template>
  <div class="editor-card">
    <input
      v-model="localTitle"
      class="title-input"
      placeholder="Note title"
      aria-label="Note title"
      @blur="onBlurSave"
    />

    <textarea
      v-model="localBody"
      class="body-input"
      placeholder="Start typing..."
      aria-label="Note body"
      @blur="onBlurSave"
    />

    <div class="toolbar">
      <span class="hint">Auto-saves on blur</span>
      <button class="btn btn-primary" @click="save" aria-label="Save note">Save</button>
    </div>
  </div>
</template>

<style scoped>
.editor-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.06);
}
.title-input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  background: white;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.title-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-15);
}
.body-input {
  width: 100%;
  min-height: 50vh;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  resize: vertical;
  background: white;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.body-input:focus {
  outline: none;
  border-color: var(--secondary);
  box-shadow: 0 0 0 4px var(--secondary-15);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
}
.hint {
  color: var(--muted);
  font-size: 12px;
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
</style>
