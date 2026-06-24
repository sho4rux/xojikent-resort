import { computed } from 'vue'
import { lang } from '../store/lang.js'
import { siteData } from '../store/siteData.js'
import uz from '../i18n/uz.js'

function mergeRotations(staticSection, liveSection) {
  if (!liveSection || !staticSection) return staticSection
  const merged = { ...staticSection }

  if (Array.isArray(staticSection.items) && Array.isArray(liveSection.items)) {
    merged.items = staticSection.items.map((item, i) => ({
      ...item,
      rotation: liveSection.items[i]?.rotation ?? 0,
    }))
  }

  if ('images' in staticSection) {
    merged.images = liveSection.images
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
    if (lang.value === 'ru') {
      return {
        nav: siteData.nav,
        hero: siteData.hero,
        about: siteData.about,
        video: siteData.video,
        services: siteData.services,
        rooms: siteData.rooms,
        gallery: siteData.gallery,
        contact: siteData.contact,
        footer: siteData.footer,
      }
    }
    return {
      nav: uz.nav,
      hero: mergeRotations(uz.hero, siteData.hero),
      about: mergeRotations(uz.about, siteData.about),
      video: { ...uz.video, youtubeUrl: siteData.video.youtubeUrl },
      services: mergeRotations(uz.services, siteData.services),
      rooms: mergeRotations(uz.rooms, siteData.rooms),
      gallery: mergeRotations(uz.gallery, siteData.gallery),
      contact: mergeRotations(uz.contact, siteData.contact),
      footer: {
        ...uz.footer,
        socialTelegram: siteData.footer.socialTelegram,
        socialInstagram: siteData.footer.socialInstagram,
        socialPhone: siteData.footer.socialPhone,
        footerAddress: siteData.footer.footerAddress,
        footerPhone: siteData.footer.footerPhone,
        footerEmail: siteData.footer.footerEmail,
        footerHours: siteData.footer.footerHours,
      },
    }
  })
  return { t }
}
