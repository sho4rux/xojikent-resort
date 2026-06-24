<template>
  <RouterView />
</template>

<script setup>
import { watchEffect, onMounted } from 'vue'
import { lang } from './store/lang.js'
import { syncFromServer } from './store/siteData.js'

const langMap = { ru: 'ru', uz: 'uz', en: 'en' }
watchEffect(() => {
  document.documentElement.lang = langMap[lang.value] ?? 'ru'
})

onMounted(() => { syncFromServer() })
</script>
