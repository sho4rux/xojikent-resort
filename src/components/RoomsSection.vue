<template>
  <section id="rooms" class="section rooms">
    <div class="container">
      <div class="rooms__header">
        <div class="section-label">{{ t.rooms.sectionLabel }}</div>
        <h2 class="section-title">{{ t.rooms.title }}</h2>
        <p class="rooms__sub">{{ t.rooms.subtitle }}</p>
      </div>

      <div class="rooms__tabs">
        <button
          v-for="tab in t.rooms.tabs"
          :key="tab.id"
          class="rooms__tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.label }}</button>
      </div>

      <div class="rooms__grid">
        <div
          v-for="room in filteredRooms"
          :key="room.img"
          class="room-card"
          @click="openModal(room)"
        >
          <div class="room-card__img">
            <img :src="room.img" :alt="room.name" loading="lazy" :style="imgRotationStyle(room.rotation)" />
            <div class="room-card__overlay">
              <span>{{ t.rooms.viewText }}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>
          <div class="room-card__info">
            <h4>{{ room.name }}</h4>
            <span class="room-card__price">{{ t.rooms.pricePrefix }} {{ room.price }} {{ t.rooms.priceUnit }}</span>
          </div>
        </div>
      </div>

      <div class="rooms__cta">
        <button class="btn btn-primary" @click="scrollTo('contact')">{{ t.rooms.bookBtn }}</button>
      </div>
    </div>

    <Transition name="modal-fade">
      <div v-if="modalRoom" class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
          <button class="modal__close" @click="closeModal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="modal__img">
            <img :src="modalRoom.img" :alt="modalRoom.name" :style="imgRotationStyle(modalRoom.rotation)" />
          </div>
          <div class="modal__info">
            <h3>{{ modalRoom.name }}</h3>
            <p>{{ modalRoom.desc }}</p>
            <div class="modal__details">
              <span v-for="d in modalRoom.details" :key="d" class="modal__tag">{{ d }}</span>
            </div>
            <div class="modal__price">{{ t.rooms.pricePrefix }} <strong>{{ modalRoom.price }}</strong> {{ t.rooms.priceUnit }}</div>
            <button class="btn btn-primary" style="width:100%;justify-content:center;" @click="bookRoom">{{ t.rooms.bookBtnModal }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { imgRotationStyle } from '../store/siteData.js'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()
const activeTab = ref('all')
const modalRoom = ref(null)

const filteredRooms = computed(() =>
  activeTab.value === 'all' ? t.value.rooms.items : t.value.rooms.items.filter(r => r.type === activeTab.value)
)

function openModal(room) {
  modalRoom.value = room
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  modalRoom.value = null
  document.body.style.overflow = ''
}
function bookRoom() {
  closeModal()
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
function onKey(e) {
  if (e.key === 'Escape' && modalRoom.value) closeModal()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.rooms { background: var(--clr-surface); }
.rooms__header { margin-bottom: 32px; }
.rooms__sub { font-size: 15px; color: var(--clr-text-muted); margin-top: 8px; }

.rooms__tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.rooms__tab {
  padding: 9px 20px; border-radius: 50px; font-size: 13px; font-weight: 600;
  border: 2px solid var(--clr-border); color: var(--clr-text-muted);
  background: transparent; cursor: pointer; transition: all 0.2s;
}
.rooms__tab:hover { border-color: var(--clr-primary); color: var(--clr-primary); }
.rooms__tab.active { background: var(--clr-primary); border-color: var(--clr-primary); color: #fff; }

.rooms__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

.room-card {
  border-radius: var(--radius-md); overflow: hidden;
  box-shadow: var(--shadow-sm); cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background: var(--clr-surface); border: 1px solid var(--clr-border);
}
.room-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.room-card__img { position: relative; height: 200px; overflow: hidden; }
.room-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.room-card:hover .room-card__img img { transform: scale(1.06); }

.room-card__overlay {
  position: absolute; inset: 0;
  background: rgba(27,67,50,0.55);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  color: #fff; font-size: 14px; font-weight: 700;
  opacity: 0; transition: opacity 0.3s;
}
.room-card:hover .room-card__overlay { opacity: 1; }

.room-card__info { padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; }
.room-card__info h4 { font-size: 14px; font-weight: 700; color: var(--clr-text); }
.room-card__price { font-size: 12px; font-weight: 700; color: var(--clr-primary); white-space: nowrap; }

.rooms__cta { text-align: center; margin-top: 40px; }

.modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7);
  z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal {
  background: var(--clr-surface); border-radius: var(--radius-xl);
  max-width: 760px; width: 100%;
  display: grid; grid-template-columns: 1fr 1fr;
  overflow: hidden; position: relative; box-shadow: var(--shadow-lg);
}
.modal__close {
  position: absolute; top: 14px; right: 14px;
  width: 36px; height: 36px;
  background: rgba(0,0,0,0.15); color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  z-index: 1; transition: background 0.2s;
}
.modal__close:hover { background: rgba(0,0,0,0.35); }
.modal__img { height: 100%; min-height: 340px; overflow: hidden; }
.modal__img img { width: 100%; height: 100%; object-fit: cover; }
.modal__info { padding: 32px 28px; display: flex; flex-direction: column; gap: 12px; }
.modal__info h3 { font-family: var(--font-display); font-size: 22px; font-weight: 700; }
.modal__info p { font-size: 14px; color: var(--clr-text-muted); line-height: 1.7; }
.modal__details { display: flex; flex-wrap: wrap; gap: 6px; }
.modal__tag {
  background: var(--clr-bg); border: 1px solid var(--clr-border);
  border-radius: 20px; font-size: 12px; font-weight: 600;
  color: var(--clr-text-muted); padding: 4px 12px;
}
.modal__price { font-size: 14px; color: var(--clr-text-muted); margin-top: 4px; }
.modal__price strong { font-size: 22px; color: var(--clr-primary); font-family: var(--font-display); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .rooms__grid { grid-template-columns: repeat(2, 1fr); }
  .modal { grid-template-columns: 1fr; }
  .modal__img { min-height: 220px; }
}
@media (max-width: 480px) { .rooms__grid { grid-template-columns: 1fr; } }
</style>
