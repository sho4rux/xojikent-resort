<template>
  <section id="video" class="section video-section" v-if="youtubeId || isAdmin">
    <div class="container">
      <div class="video-section__header">
        <div class="section-label">{{ t.video.sectionLabel }}</div>
        <h2 class="section-title">{{ t.video.title }}</h2>
        <p class="video-section__sub">{{ t.video.subtitle }}</p>
      </div>

      <div class="video-frame">
        <div v-if="!youtubeId" class="video-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <p>Вставьте ссылку на YouTube в настройках админ-панели</p>
        </div>
        <template v-else>
          <div v-if="!playing" class="video-poster-wrap" @click="play">
            <img
              class="video-poster"
              :src="`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`"
              :alt="t.video.title"
            />
            <div class="video-overlay"></div>
            <button class="video-play-btn" aria-label="Играть">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
          </div>
          <iframe
            v-else
            class="video-iframe"
            :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContent } from '../composables/useContent.js'

const props = defineProps({ isAdmin: { type: Boolean, default: false } })

const { t } = useContent()
const playing = ref(false)

function extractId(url) {
  if (!url) return ''
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/)
  return m ? m[1] : url.trim()
}

const youtubeId = computed(() => extractId(t.value.video?.youtubeUrl))

function play() { playing.value = true }
</script>

<style scoped>
.video-section { background: var(--clr-bg); }

.video-section__header { text-align: center; max-width: 640px; margin: 0 auto 48px; }
.video-section__header .section-label { justify-content: center; }
.video-section__header .section-label::before { display: none; }
.video-section__sub { font-size: 16px; color: var(--clr-text-muted); margin-top: -8px; }

.video-frame {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.18);
  aspect-ratio: 16 / 9;
  background: #0f172a;
  position: relative;
}

.video-poster-wrap {
  position: absolute; inset: 0;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.video-poster {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.video-poster-wrap:hover .video-poster { transform: scale(1.03); }

.video-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(27,67,50,0.45) 0%, rgba(0,0,0,0.25) 100%);
  transition: opacity 0.3s;
}
.video-poster-wrap:hover .video-overlay { opacity: 0.7; }

.video-play-btn {
  position: absolute;
  width: 80px; height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  color: var(--clr-primary);
  display: flex; align-items: center; justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
  box-shadow: 0 8px 32px rgba(0,0,0,0.28);
  padding-left: 4px;
}
.video-poster-wrap:hover .video-play-btn {
  transform: scale(1.12);
  background: #fff;
  box-shadow: 0 12px 40px rgba(45,106,79,0.4);
}

.video-iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: none;
}

.video-placeholder {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px;
  color: rgba(255,255,255,0.35);
  font-size: 14px; text-align: center;
  padding: 24px;
}

@media (max-width: 768px) {
  .video-frame { border-radius: 14px; }
  .video-play-btn { width: 64px; height: 64px; }
}
</style>
