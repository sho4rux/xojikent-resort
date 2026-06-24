<template>
  <div class="csel" :class="{ 'csel--open': open }" ref="root">
    <button type="button" class="csel__trigger" @click="toggle">
      <span :class="{ 'csel__placeholder': !hasValue }">{{ displayLabel }}</span>
      <svg class="csel__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <Transition name="csel-drop">
      <div v-if="open" class="csel__menu">
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          class="csel__option"
          :class="{ 'csel__option--active': modelValue === opt.value }"
          @click="select(opt.value)"
        >
          <svg v-if="modelValue === opt.value" class="csel__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ opt.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { default: '' },
  options: { type: Array, required: true }, // [{ value, label }]
  placeholder: { type: String, default: 'Выберите...' },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const root = ref(null)

const hasValue = computed(() => props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined)
const displayLabel = computed(() => {
  if (!hasValue.value) return props.placeholder
  return props.options.find(o => o.value === props.modelValue)?.label ?? props.placeholder
})

function toggle() { open.value = !open.value }
function select(val) {
  emit('update:modelValue', val)
  open.value = false
}

function onOutside(e) {
  if (root.value && !root.value.contains(e.target)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', onOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', onOutside))
</script>

<style scoped>
.csel { position: relative; width: 100%; user-select: none; }

.csel__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--clr-surface);
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--clr-text);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  text-align: left;
}
.csel__trigger:focus { outline: none; }
.csel--open .csel__trigger,
.csel__trigger:hover {
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
}
.csel__placeholder { color: #94a3b8; }

.csel__arrow {
  flex-shrink: 0;
  color: #94a3b8;
  transition: transform 0.2s, color 0.2s;
}
.csel--open .csel__arrow { transform: rotate(180deg); color: var(--clr-primary); }

.csel__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  padding: 6px;
  z-index: 200;
  max-height: 260px;
  overflow-y: auto;
}

.csel__option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--clr-text);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.csel__option:hover { background: rgba(45,106,79,0.07); }
.csel__option--active { color: var(--clr-primary); font-weight: 700; }
.csel__option--active:hover { background: rgba(45,106,79,0.1); }

.csel__check { flex-shrink: 0; color: var(--clr-primary); }

/* scrollbar inside menu */
.csel__menu::-webkit-scrollbar { width: 5px; }
.csel__menu::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

/* dropdown animation */
.csel-drop-enter-active { animation: cselIn 0.18s ease; }
.csel-drop-leave-active { transition: opacity 0.12s, transform 0.12s; }
.csel-drop-leave-to { opacity: 0; transform: translateY(-4px); }
@keyframes cselIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
</style>
