<template>
  <div class="field-wrap">
    <label class="field-label">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup>
defineProps(['label'])
</script>

<style scoped>
.field-wrap { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.06em; text-transform: uppercase; }
:deep(input), :deep(select), :deep(textarea) {
  width: 100%; padding: 10px 12px;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; color: #1e293b; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
:deep(input:focus), :deep(select:focus), :deep(textarea:focus) {
  border-color: #2d6a4f; box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
}
:deep(textarea) { resize: vertical; min-height: 72px; }
</style>
