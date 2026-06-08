<template>
  <RouterView />
</template>

<script setup>
import { watchEffect } from 'vue'
import { lang } from './store/lang.js'

const langMap = { ru: 'ru', uz: 'uz', en: 'en' }
watchEffect(() => {
  document.documentElement.lang = langMap[lang.value] ?? 'ru'
})
</script>
