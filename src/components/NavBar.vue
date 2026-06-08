<template>
  <header :class="['navbar', { scrolled: isScrolled }]">
    <div class="container navbar__inner">
      <!-- Logo -->
      <a href="#hero" class="navbar__logo" @click.prevent="scrollTo('hero')">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 10v20h8v-8h8v8h8V10L16 2z" fill="currentColor" opacity="0.9"/>
            <path d="M16 2L4 10h24L16 2z" fill="currentColor"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-main">HOJIKENT</span>
          <span class="logo-sub">OROMGOHI</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="navbar__links">
        <a v-for="link in links" :key="link.id"
           :href="`#${link.id}`"
           class="navbar__link"
           :class="{ active: activeSection === link.id }"
           @click.prevent="scrollTo(link.id)">
          {{ link.label }}
        </a>
        <div class="lang-switcher">
          <button v-for="l in langs" :key="l" class="lang-btn" :class="{ active: lang === l }" @click="lang = l">{{ l.toUpperCase() }}</button>
        </div>
        <button class="btn btn-primary navbar__cta" @click="scrollTo('contact')">
          {{ t.nav.book }}
        </button>
      </nav>

      <!-- Mobile hamburger -->
      <button class="navbar__burger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="navbar__mobile">
        <a v-for="link in links" :key="link.id"
           :href="`#${link.id}`"
           class="navbar__mobile-link"
           @click.prevent="mobileNav(link.id)">
          {{ link.label }}
        </a>
        <div class="lang-switcher lang-switcher--mobile">
          <button v-for="l in langs" :key="l" class="lang-btn" :class="{ active: lang === l }" @click="lang = l">{{ l.toUpperCase() }}</button>
        </div>
        <button class="btn btn-primary" style="width:100%; justify-content:center;" @click="mobileNav('contact')">
          {{ t.nav.book }}
        </button>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { lang } from '../store/lang.js'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('hero')
const langs = ['ru', 'uz', 'en']

const links = computed(() => [
  { id: 'about',    label: t.value.nav.about },
  { id: 'services', label: t.value.nav.services },
  { id: 'gallery',  label: t.value.nav.gallery },
  { id: 'contact',  label: t.value.nav.contact },
])

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  mobileOpen.value = false
}

function mobileNav(id) {
  mobileOpen.value = false
  setTimeout(() => scrollTo(id), 150)
}

function onScroll() {
  isScrolled.value = window.scrollY > 60
  const sections = ['hero', 'about', 'services', 'rooms', 'gallery', 'contact']
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && window.scrollY + 120 >= el.offsetTop) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  transition: background 0.4s ease, box-shadow 0.4s ease;
  padding: 0;
}
.navbar.scrolled {
  background: rgba(255,255,255,0.97);
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--clr-primary);
}
.logo-icon {
  width: 40px; height: 40px;
  background: var(--clr-primary);
  color: #fff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.logo-main {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--clr-primary);
  letter-spacing: 0.05em;
}
.logo-sub {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--clr-text-muted);
}
.navbar__links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.navbar__link {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--clr-text);
  transition: color 0.2s;
  position: relative;
  padding-bottom: 2px;
}
.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0; right: 100%;
  height: 2px;
  background: var(--clr-primary);
  transition: right 0.3s ease;
}
.navbar__link:hover,
.navbar__link.active {
  color: var(--clr-primary);
}
.navbar__link.active::after,
.navbar__link:hover::after {
  right: 0;
}
.navbar:not(.scrolled) .navbar__link {
  color: rgba(255,255,255,0.92);
}
.navbar:not(.scrolled) .navbar__link::after {
  background: #fff;
}
.navbar:not(.scrolled) .navbar__link:hover,
.navbar:not(.scrolled) .navbar__link.active {
  color: #fff;
}
.navbar:not(.scrolled) .logo-main { color: #fff; }
.navbar:not(.scrolled) .logo-sub { color: rgba(255,255,255,0.7); }
.navbar:not(.scrolled) .logo-icon { background: rgba(255,255,255,0.2); }

.navbar__cta { padding: 10px 22px; font-size: 13px; }

/* Language switcher */
.lang-switcher {
  display: flex;
  gap: 2px;
  background: rgba(0,0,0,0.07);
  border-radius: 8px;
  padding: 3px;
}
.navbar:not(.scrolled) .lang-switcher {
  background: rgba(255,255,255,0.15);
}
.lang-btn {
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border-radius: 5px;
  color: var(--clr-text-muted);
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}
.lang-btn:hover { color: var(--clr-primary); }
.lang-btn.active {
  background: var(--clr-primary);
  color: #fff;
}
.navbar:not(.scrolled) .lang-btn { color: rgba(255,255,255,0.7); }
.navbar:not(.scrolled) .lang-btn:hover { color: #fff; }
.navbar:not(.scrolled) .lang-btn.active {
  background: rgba(255,255,255,0.25);
  color: #fff;
}

.lang-switcher--mobile {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  justify-content: center;
  padding: 6px;
}
.lang-switcher--mobile .lang-btn { font-size: 12px; padding: 6px 14px; color: var(--clr-text); }
.lang-switcher--mobile .lang-btn.active { background: var(--clr-primary); color: #fff; }

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.navbar__burger span {
  display: block;
  width: 24px; height: 2px;
  background: var(--clr-primary);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.navbar:not(.scrolled) .navbar__burger span { background: #fff; }
.navbar__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger.open span:nth-child(2) { opacity: 0; }
.navbar__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.navbar__mobile {
  background: #fff;
  padding: 20px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--clr-border);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}
.navbar__mobile-link {
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--clr-text);
  border-bottom: 1px solid var(--clr-border);
  transition: color 0.2s;
}
.navbar__mobile-link:hover { color: var(--clr-primary); }

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 600px;
  opacity: 1;
}

@media (max-width: 900px) {
  .navbar__links { display: none; }
  .navbar__burger { display: flex; }
}
</style>
