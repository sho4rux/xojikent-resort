import { ref, watch } from 'vue'

const stored = localStorage.getItem('hojikent_lang')
export const lang = ref(['ru', 'uz'].includes(stored) ? stored : 'ru')

watch(lang, v => localStorage.setItem('hojikent_lang', v))
