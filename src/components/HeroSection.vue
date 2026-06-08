<template>
  <section id="hero" class="hero">
    <div class="hero__bg">
      <TransitionGroup name="hero-fade">
        <div
          v-for="(img, i) in t.hero.images"
          :key="img.src + i"
          v-show="currentBg === i"
          class="hero__bg-slide"
        >
          <div
            class="hero__bg-inner"
            :style="{ backgroundImage: `url(${img.src})`, transform: `rotate(${img.rotation || 0}deg) scale(${(img.rotation || 0) % 180 !== 0 ? 1.5 : 1.04})` }"
          />
        </div>
      </TransitionGroup>
      <div class="hero__overlay" />
    </div>

    <div class="container hero__content">
      <div class="hero__text fade-up">
        <div class="hero__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {{ t.hero.badge }}
        </div>
        <h1 class="hero__title">
          {{ t.hero.title }}<br>
          <em>{{ t.hero.titleItalic }}</em>
        </h1>
        <p class="hero__subtitle" style="white-space: pre-line">{{ t.hero.subtitle }}</p>
        <div class="hero__actions">
          <button class="btn btn-accent" @click="scrollTo('contact')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {{ t.hero.btnBook }}
          </button>
          <button class="btn btn-outline hero__btn-light" @click="scrollTo('about')">
            {{ t.hero.btnLearn }}
          </button>
        </div>
      </div>

      <div class="hero__stats">
        <div class="hero__stat" v-for="s in t.hero.stats" :key="s.label">
          <strong>{{ s.value }}</strong>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </div>

    <div class="hero__scroll">
      <div class="hero__scroll-dot"></div>
      <span>{{ t.hero.scrollText }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()
const currentBg = ref(0)
let timer = null

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  timer = setInterval(() => {
    const len = t.value.hero.images.length
    if (len > 1) currentBg.value = (currentBg.value + 1) % len
  }, 5000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__bg-slide {
  position: absolute;
  inset: 0;
  overflow: hidden;
  animation: kenburns 10s ease-in-out infinite alternate;
}
.hero__bg-inner {
  position: absolute;
  inset: -20%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}
@keyframes kenburns {
  from { transform: scale(1.04) translateX(0); }
  to   { transform: scale(1.0) translateX(-1%); }
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(27, 67, 50, 0.75) 0%,
    rgba(27, 67, 50, 0.45) 50%,
    rgba(0,0,0,0.3) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: 80px;
}
.hero__text { max-width: 580px; }

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.95);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(42px, 7vw, 80px);
  font-weight: 700;
  color: #fff;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}
.hero__title em {
  font-style: italic;
  color: var(--clr-accent-light);
}

.hero__subtitle {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  line-height: 1.6;
  margin-bottom: 36px;
}

.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero__btn-light {
  color: #fff;
  border-color: rgba(255,255,255,0.6);
}
.hero__btn-light:hover {
  background: rgba(255,255,255,0.15);
  border-color: #fff;
  color: #fff;
}

.hero__stats {
  display: flex;
  gap: 0;
  margin-top: 56px;
  align-self: flex-start;
}
.hero__stat {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 16px 28px;
  text-align: center;
  border-right: none;
}
.hero__stat:first-child { border-radius: 10px 0 0 10px; }
.hero__stat:last-child  { border-radius: 0 10px 10px 0; border-right: 1px solid rgba(255,255,255,0.2); }
.hero__stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--clr-accent-light);
  line-height: 1;
}
.hero__stat span {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,0.75);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-top: 4px;
}

.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.hero__scroll-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  animation: bounce 1.4s ease-in-out infinite;
}
@keyframes bounce {
  0%,100% { transform: translateY(0); opacity: 0.5; }
  50%      { transform: translateY(8px); opacity: 1; }
}

.hero-fade-enter-active,
.hero-fade-leave-active { transition: opacity 1.2s ease; }
.hero-fade-enter-from,
.hero-fade-leave-to { opacity: 0; }

@media (max-width: 600px) {
  .hero__stats { flex-direction: column; gap: 8px; }
  .hero__stat { border: 1px solid rgba(255,255,255,0.2); border-radius: 10px !important; }
  .hero__actions { flex-direction: column; }
  .hero__actions .btn { justify-content: center; }
}
</style>
