<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="contact__grid">
        <div class="contact__info">
          <div class="section-label">{{ t.contact.sectionLabel }}</div>
          <h2 class="section-title">{{ t.contact.title }}</h2>

          <div class="contact__items">
            <div class="contact__item" v-for="item in contactItems" :key="item.label">
              <div class="contact__icon"><span v-html="item.icon"></span></div>
              <div class="contact__detail">
                <span class="contact__label">{{ item.label }}</span>
                <a :href="item.href || '#'" class="contact__value">{{ item.value }}</a>
              </div>
            </div>
          </div>

          <div class="contact__map">
            <iframe
              :src="t.contact.mapEmbed"
              width="100%" height="240"
              style="border:0; border-radius:12px;"
              allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Карта"
            ></iframe>
          </div>
        </div>

        <div class="contact__form-wrap">
          <h3 class="form__title">{{ t.contact.formTitle }}</h3>
          <p class="form__sub">{{ t.contact.formSubtitle }}</p>

          <form class="contact__form" @submit.prevent="submitForm">
            <div class="form__row">
              <div class="form__group">
                <label>{{ t.contact.nameLabel }}</label>
                <input type="text" v-model="form.name" :placeholder="t.contact.namePlaceholder" required />
              </div>
              <div class="form__group">
                <label>{{ t.contact.phoneLabel }}</label>
                <input type="tel" v-model="form.phone" :placeholder="t.contact.phonePlaceholder" required />
              </div>
            </div>
            <div class="form__row">
              <div class="form__group">
                <label>{{ t.contact.checkinLabel }}</label>
                <input type="date" v-model="form.checkin" :min="today" />
              </div>
              <div class="form__group">
                <label>{{ t.contact.checkoutLabel }}</label>
                <input type="date" v-model="form.checkout" :min="form.checkin ? minCheckout : today" />
              </div>
            </div>
            <div class="form__row">
              <div class="form__group">
                <label>{{ t.contact.guestsLabel }}</label>
                <select v-model="form.guests">
                  <option value="">{{ t.contact.guestsPlaceholder }}</option>
                  <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ guestLabel(n) }}</option>
                </select>
              </div>
              <div class="form__group">
                <label>{{ t.contact.roomTypeLabel }}</label>
                <select v-model="form.roomType">
                  <option value="">{{ t.contact.roomTypeAny }}</option>
                  <option value="standard">{{ t.contact.roomStandard }}</option>
                  <option value="double">{{ t.contact.roomDouble }}</option>
                  <option value="suite">{{ t.contact.roomSuite }}</option>
                </select>
              </div>
            </div>
            <div class="form__group">
              <label>{{ t.contact.messageLabel }}</label>
              <textarea v-model="form.message" rows="3" :placeholder="t.contact.messagePlaceholder"></textarea>
            </div>
            <button type="submit" class="btn btn-primary form__submit" :disabled="submitting">
              <span v-if="!submitting">{{ t.contact.submitBtn }}</span>
              <span v-else>{{ t.contact.submittingBtn }}</span>
            </button>
            <Transition name="toast">
              <div v-if="submitted" class="form__success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ t.contact.successMessage }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useContent } from '../composables/useContent.js'

const { t } = useContent()

const submitting = ref(false)
const submitted  = ref(false)
const today = new Date().toISOString().split('T')[0]

const form = reactive({ name: '', phone: '', checkin: '', checkout: '', guests: '', roomType: '', message: '' })

const minCheckout = computed(() => {
  if (!form.checkin) return today
  const d = new Date(form.checkin)
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

watch(() => form.checkin, () => {
  if (form.checkout && form.checkout <= form.checkin) form.checkout = ''
})

function guestLabel(n) {
  const s = t.value.contact.guestSingular
  const f = t.value.contact.guestFew
  const m = t.value.contact.guestMany
  if (n === 1) return s
  if (n < 5) return f
  return m
}

const contactItems = computed(() => [
  {
    label: t.value.contact.labelAddress,
    value: t.value.contact.address,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    label: t.value.contact.labelPhone,
    value: t.value.contact.phone,
    href: `tel:${t.value.contact.phone.replace(/\s/g, '')}`,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  {
    label: t.value.contact.labelEmail,
    value: t.value.contact.email,
    href: `mailto:${t.value.contact.email}`,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
  {
    label: t.value.contact.labelHours,
    value: t.value.contact.hours,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
])

async function submitForm() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 1200))
  submitting.value = false
  submitted.value = true
  Object.assign(form, { name: '', phone: '', checkin: '', checkout: '', guests: '', roomType: '', message: '' })
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>

<style scoped>
.contact { background: var(--clr-surface); }

.contact__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

.contact__items { display: flex; flex-direction: column; gap: 20px; margin: 28px 0; }
.contact__item { display: flex; gap: 16px; align-items: flex-start; }
.contact__icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(45,106,79,0.1); color: var(--clr-primary);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.contact__label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--clr-text-muted); margin-bottom: 2px; }
.contact__value { font-size: 14px; font-weight: 600; color: var(--clr-text); line-height: 1.4; transition: color 0.2s; }
.contact__value:hover { color: var(--clr-primary); }
.contact__map { margin-top: 4px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--clr-border); }

.contact__form-wrap { background: var(--clr-bg); border-radius: var(--radius-xl); padding: 36px 32px; border: 1px solid var(--clr-border); }
.form__title { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 6px; }
.form__sub { font-size: 14px; color: var(--clr-text-muted); margin-bottom: 28px; }

.contact__form { display: flex; flex-direction: column; gap: 16px; }
.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form__group { display: flex; flex-direction: column; gap: 6px; }
.form__group label { font-size: 12px; font-weight: 700; color: var(--clr-text-muted); letter-spacing: 0.04em; text-transform: uppercase; }
.form__group input, .form__group select, .form__group textarea {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--clr-border); border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 14px; color: var(--clr-text);
  background: var(--clr-surface); transition: border-color 0.2s, box-shadow 0.2s; outline: none;
}
.form__group input:focus, .form__group select:focus, .form__group textarea:focus {
  border-color: var(--clr-primary); box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
}
.form__group textarea { resize: vertical; min-height: 80px; }
.form__submit { width: 100%; justify-content: center; padding: 15px; font-size: 15px; margin-top: 4px; }
.form__submit:disabled { opacity: 0.7; cursor: not-allowed; }

.form__success {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 18px;
  background: rgba(45,106,79,0.1); border: 1px solid rgba(45,106,79,0.25);
  border-radius: var(--radius-sm); color: var(--clr-primary); font-size: 14px; font-weight: 600;
}

.toast-enter-active { animation: toastIn 0.4s ease; }
.toast-leave-active { transition: opacity 0.3s; }
.toast-leave-to { opacity: 0; }
@keyframes toastIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

@media (max-width: 900px) { .contact__grid { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 600px) { .form__row { grid-template-columns: 1fr; } .contact__form-wrap { padding: 24px 20px; } }
</style>
