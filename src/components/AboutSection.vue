<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about__grid">
        <div class="about__text" ref="textRef">
          <div class="section-label">{{ t.about.sectionLabel }}</div>
          <h2 class="section-title" style="white-space: pre-line">{{ t.about.title }}</h2>
          <p class="about__desc" v-for="(p, i) in t.about.paragraphs" :key="i">{{ p }}</p>

          <div class="about__features">
            <div class="about__feature" v-for="f in t.about.features" :key="f.title">
              <div class="about__feature-icon">
                <span v-html="iconPresets[f.iconKey] || ''"></span>
              </div>
              <div>
                <strong>{{ f.title }}</strong>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about__images" ref="imgRef">
          <div class="about__img-main">
            <img
              :src="t.about.images[0]?.src"
              alt="Пансионат Ходжикент"
              loading="lazy"
              :style="imgRotationStyle(t.about.images[0]?.rotation)"
            />
          </div>
          <div class="about__img-secondary">
            <img
              :src="t.about.images[1]?.src"
              alt="Территория пансионата"
              loading="lazy"
              :style="imgRotationStyle(t.about.images[1]?.rotation)"
            />
          </div>
          <div class="about__img-badge">
            <span class="badge-num">{{ t.about.badgeNumber }}</span>
            <span class="badge-text" style="white-space: pre-line">{{ t.about.badgeText }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { iconPresets, imgRotationStyle } from '../store/siteData.js'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()
const textRef = ref(null)
const imgRef  = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
    { threshold: 0.15 }
  )
  if (textRef.value) observer.observe(textRef.value)
  if (imgRef.value)  observer.observe(imgRef.value)
})
</script>

<style scoped>
.about { background: var(--clr-surface); }

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.about__text {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.about__text.visible { opacity: 1; transform: none; }

.about__desc {
  color: var(--clr-text-muted);
  font-size: 15px;
  line-height: 1.75;
  margin-bottom: 14px;
}

.about__features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
}
.about__feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--clr-bg);
  border-radius: var(--radius-md);
  border: 1px solid var(--clr-border);
  transition: box-shadow 0.2s, transform 0.2s;
}
.about__feature:hover { box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.about__feature-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(45,106,79,0.12);
  color: var(--clr-primary);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.about__feature strong { display: block; font-size: 13px; font-weight: 700; margin-bottom: 2px; color: var(--clr-text); }
.about__feature p { font-size: 12px; color: var(--clr-text-muted); line-height: 1.4; }

.about__images {
  position: relative;
  height: 520px;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}
.about__images.visible { opacity: 1; transform: none; }

.about__img-main {
  position: absolute;
  top: 0; left: 0;
  width: 75%; height: 78%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.about__img-main img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.about__img-main:hover img { transform: scale(1.04); }

.about__img-secondary {
  position: absolute;
  bottom: 0; right: 0;
  width: 55%; height: 46%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 4px solid var(--clr-surface);
}
.about__img-secondary img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.about__img-secondary:hover img { transform: scale(1.04); }

.about__img-badge {
  position: absolute;
  top: 50%; left: 70%;
  transform: translate(-50%, -50%);
  background: var(--clr-primary);
  color: #fff;
  width: 90px; height: 90px;
  border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(45,106,79,0.4);
  z-index: 10;
}
.badge-num { font-family: var(--font-display); font-size: 22px; font-weight: 700; line-height: 1; }
.badge-text { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-align: center; opacity: 0.85; line-height: 1.3; }

@media (max-width: 900px) {
  .about__grid { grid-template-columns: 1fr; gap: 40px; }
  .about__images { height: 380px; }
}
@media (max-width: 600px) {
  .about__features { grid-template-columns: 1fr; }
  .about__images { height: 300px; }
}
</style>
