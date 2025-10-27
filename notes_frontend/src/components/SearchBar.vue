<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
defineProps<{ placeholder?: string }>()
</script>

<template>
  <div class="search">
    <span class="icon" aria-hidden="true">🔎</span>
    <input
      v-model="modelValue"
      type="search"
      class="input"
      :placeholder="placeholder ?? 'Search…'"
      aria-label="Search"
    />
    <kbd class="kbd" aria-hidden="true">/</kbd>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
}
.icon {
  position: absolute;
  left: 10px;
  color: var(--muted);
  font-size: 14px;
}
.input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px 10px 30px;
  background: white;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-15);
}
.kbd {
  position: absolute;
  right: 8px;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--border);
  color: var(--muted);
  background: var(--bg);
  font-size: 11px;
}
</style>
