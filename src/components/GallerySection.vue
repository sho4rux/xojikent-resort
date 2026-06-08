<template>
  <section id="gallery" class="section gallery">
    <div class="container">
      <div class="gallery__header">
        <div class="section-label">{{ t.gallery.sectionLabel }}</div>
        <h2 class="section-title">{{ t.gallery.title }}</h2>
      </div>

      <div class="gallery__grid">
        <!-- First image: wide feature card -->
        <div
          v-if="galleryImages[0]"
          class="gallery__item gallery__item--feature"
          @click="openLightbox(0)"
        >
          <img :src="galleryImages[0].src" :alt="galleryImages[0].alt || ''" loading="lazy" :style="imgRotationStyle(galleryImages[0].rotation)" />
          <div class="gallery__item-overlay"><span class="overlay-icon">⊕</span></div>
        </div>

        <!-- Remaining images: uniform 3-column sub-grid -->
        <div class="gallery__sub">
          <div
            v-for="(img, i) in galleryImages.slice(1)"
            :key="img.src + i"
            class="gallery__item"
            @click="openLightbox(i + 1)"
          >
            <img :src="img.src" :alt="img.alt || ''" loading="lazy" :style="imgRotationStyle(img.rotation)" />
            <div class="gallery__item-overlay"><span class="overlay-icon">⊕</span></div>
          </div>
        </div>
      </div>

      <div class="gallery__more" v-if="!showAll && t.gallery.images.length > 8">
        <button class="btn btn-outline" @click="showAll = true">
          {{ t.gallery.showAllBtn }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="lb-fade">
      <div v-if="lbIndex !== null" class="lightbox" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox" aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="lb-prev" @click="prev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="lb-img-wrap">
          <Transition name="img-slide" mode="out-in">
            <img :key="lbIndex" :src="galleryImages[lbIndex].src" :alt="galleryImages[lbIndex].alt || ''" class="lb-img" :style="imgRotationStyle(galleryImages[lbIndex].rotation)" />
          </Transition>
        </div>
        <button class="lb-next" @click="next" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="lb-counter">{{ lbIndex + 1 }} / {{ galleryImages.length }}</div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { imgRotationStyle } from '../store/siteData.js'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()
const showAll = ref(false)
const lbIndex = ref(null)

const galleryImages = computed(() =>
  showAll.value ? t.value.gallery.images : t.value.gallery.images.slice(0, 8)
)

function openLightbox(i) { lbIndex.value = i; document.body.style.overflow = 'hidden' }
function closeLightbox() { lbIndex.value = null; document.body.style.overflow = '' }
function prev() { lbIndex.value = (lbIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length }
function next() { lbIndex.value = (lbIndex.value + 1) % galleryImages.value.length }

function onKey(e) {
  if (lbIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.gallery { background: var(--clr-bg-alt); }
.gallery__header { margin-bottom: 40px; }

/* Feature image (full width) + sub-grid layout */
.gallery__grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gallery__item--feature {
  width: 100%;
  aspect-ratio: 21/8;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.gallery__item--feature img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.gallery__item--feature:hover img { transform: scale(1.04); }

/* Sub-grid: 4 uniform columns, all same aspect ratio */
.gallery__sub {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.gallery__item {
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--clr-bg);
}
.gallery__item img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}
.gallery__item:hover img { transform: scale(1.07); }

.gallery__item-overlay {
  position: absolute; inset: 0;
  background: rgba(27, 67, 50, 0.4);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.gallery__item--feature:hover .gallery__item-overlay,
.gallery__item:hover .gallery__item-overlay { opacity: 1; }
.overlay-icon { font-size: 32px; color: #fff; line-height: 1; }

.gallery__more { text-align: center; margin-top: 32px; }

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,0.92);
  z-index: 3000; display: flex; align-items: center; justify-content: center;
}
.lb-img-wrap { max-width: 90vw; max-height: 90vh; display: flex; align-items: center; justify-content: center; }
.lb-img { max-width: 90vw; max-height: 88vh; object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); }
.lb-close, .lb-prev, .lb-next {
  position: absolute;
  background: rgba(255,255,255,0.12); color: #fff;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 50%;
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; cursor: pointer;
}
.lb-close:hover, .lb-prev:hover, .lb-next:hover { background: rgba(255,255,255,0.25); }
.lb-close { top: 20px; right: 20px; }
.lb-prev  { left: 20px; top: 50%; transform: translateY(-50%); }
.lb-next  { right: 20px; top: 50%; transform: translateY(-50%); }
.lb-counter { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600; letter-spacing: 0.05em; }

.lb-fade-enter-active, .lb-fade-leave-active { transition: opacity 0.3s; }
.lb-fade-enter-from, .lb-fade-leave-to { opacity: 0; }
.img-slide-enter-active, .img-slide-leave-active { transition: all 0.25s ease; }
.img-slide-enter-from { opacity: 0; transform: scale(0.96); }
.img-slide-leave-to  { opacity: 0; transform: scale(1.04); }

@media (max-width: 900px) {
  .gallery__sub { grid-template-columns: repeat(3, 1fr); }
  .gallery__item--feature { aspect-ratio: 16/7; }
}
@media (max-width: 600px) {
  .gallery__sub { grid-template-columns: repeat(2, 1fr); }
  .gallery__item--feature { aspect-ratio: 16/9; }
  .lb-prev { left: 10px; } .lb-next { right: 10px; }
}
</style>
