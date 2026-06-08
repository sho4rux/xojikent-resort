import { computed } from 'vue'
import { lang } from '../store/lang.js'
import { siteData } from '../store/siteData.js'
import en from '../i18n/en.js'
import uz from '../i18n/uz.js'

function mergeRotations(staticSection, liveSection) {
  if (!liveSection || !staticSection) return staticSection
  const merged = { ...staticSection }

  const imgFields = ['imageMain', 'imageSecondary']
  for (const f of imgFields) {
    if (liveSection[f] && staticSection[f]) {
      merged[f] = { ...staticSection[f], rotation: liveSection[f].rotation ?? 0 }
    }
  }

  if (Array.isArray(staticSection.items) && Array.isArray(liveSection.items)) {
    merged.items = staticSection.items.map((item, i) => ({
      ...item,
      rotation: liveSection.items[i]?.rotation ?? 0,
    }))
  }

  if ('images' in staticSection) {
    merged.images = liveSection.images
  }

  if ('socialTelegram' in staticSection) {
    merged.socialTelegram = liveSection.socialTelegram
    merged.socialInstagram = liveSection.socialInstagram
    merged.socialPhone = liveSection.socialPhone
  }
  if ('mapEmbed' in staticSection) {
    merged.mapEmbed = liveSection.mapEmbed
    merged.phone = liveSection.phone
    merged.email = liveSection.email
    merged.address = liveSection.address
    merged.hours = liveSection.hours
  }

  return merged
}

export function useContent() {
  const t = computed(() => {
    // Always return a NEW plain object so Vue's equality check always detects changes
    // when switching between languages (including switching back to RU).
    if (lang.value === 'ru') {
      return {
        nav: siteData.nav,
        hero: siteData.hero,
        about: siteData.about,
        services: siteData.services,
        rooms: siteData.rooms,
        gallery: siteData.gallery,
        contact: siteData.contact,
        footer: siteData.footer,
      }
    }
    const base = lang.value === 'en' ? en : uz
    return {
      nav: base.nav,
      hero: mergeRotations(base.hero, siteData.hero),
      about: mergeRotations(base.about, siteData.about),
      services: mergeRotations(base.services, siteData.services),
      rooms: mergeRotations(base.rooms, siteData.rooms),
      gallery: mergeRotations(base.gallery, siteData.gallery),
      contact: mergeRotations(base.contact, siteData.contact),
      footer: mergeRotations(base.footer, siteData.footer),
    }
  })
  return { t }
}
