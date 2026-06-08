<template>
  <section id="services" class="section services">
    <div class="container">
      <div class="services__header">
        <div class="section-label">{{ t.services.sectionLabel }}</div>
        <h2 class="section-title">{{ t.services.title }}</h2>
        <p class="services__subtitle">{{ t.services.subtitle }}</p>
      </div>

      <div class="services__grid">
        <div
          v-for="(svc, i) in t.services.items"
          :key="svc.title"
          class="svc-card"
          :style="{ animationDelay: `${i * 0.12}s` }"
        >
          <div class="svc-card__img">
            <img :src="svc.img" :alt="svc.title" loading="lazy" :style="imgRotationStyle(svc.rotation)" />
            <div class="svc-card__icon">
              <span v-html="iconPresets[svc.iconKey] || ''"></span>
            </div>
          </div>
          <div class="svc-card__body">
            <h3 class="svc-card__title">{{ svc.title }}</h3>
            <p class="svc-card__desc">{{ svc.desc }}</p>
            <div class="svc-card__price" v-if="svc.price">
              <strong>{{ svc.price }}</strong>
              <span class="price-unit">{{ svc.unit }}</span>
            </div>
            <button class="svc-card__link" @click="scrollTo('contact')">
              {{ svc.cta }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p class="services__note">{{ t.services.note }}</p>
    </div>
  </section>
</template>

<script setup>
import { iconPresets, imgRotationStyle } from '../store/siteData.js'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.services { background: var(--clr-bg-alt); }

.services__header { text-align: center; margin-bottom: 52px; }
.services__header .section-label { justify-content: center; }
.services__header .section-label::before { display: none; }
.services__subtitle { font-size: 16px; color: var(--clr-text-muted); max-width: 480px; margin: 0 auto; }

.services__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

.svc-card {
  background: var(--clr-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s, transform 0.3s;
  animation: fadeUp 0.65s ease both;
}
.svc-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }

.svc-card__img { position: relative; height: 220px; overflow: hidden; }
.svc-card__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.svc-card:hover .svc-card__img img { transform: scale(1.06); }

.svc-card__icon {
  position: absolute;
  bottom: -18px; left: 20px;
  width: 44px; height: 44px;
  background: var(--clr-primary);
  color: #fff;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(45,106,79,0.35);
}

.svc-card__body { padding: 32px 24px 24px; }
.svc-card__title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--clr-text); margin-bottom: 10px; }
.svc-card__desc { font-size: 14px; color: var(--clr-text-muted); line-height: 1.7; margin-bottom: 16px; }
.svc-card__price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 20px; }
.price-label { font-size: 12px; color: var(--clr-text-muted); font-weight: 600; }
.svc-card__price strong { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--clr-primary); }
.price-unit { font-size: 13px; color: var(--clr-text-muted); }

.svc-card__link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: var(--clr-primary);
  padding: 10px 18px;
  border: 2px solid var(--clr-border);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}
.svc-card__link:hover { background: var(--clr-primary); color: #fff; border-color: var(--clr-primary); }

.services__note { text-align: center; margin-top: 24px; font-size: 12px; color: var(--clr-text-muted); }

@media (max-width: 900px) {
  .services__grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
</style>
