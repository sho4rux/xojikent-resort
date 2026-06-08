<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="logo-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 10v20h8v-8h8v8h8V10L16 2z" fill="currentColor" opacity="0.9"/>
                <path d="M16 2L4 10h24L16 2z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div class="logo-main">{{ t.footer.logoMain }}</div>
              <div class="logo-sub">{{ t.footer.logoSub }}</div>
            </div>
          </div>
          <p class="footer__desc">{{ t.footer.brandDesc }}</p>
          <div class="footer__social">
            <a :href="t.footer.socialTelegram" aria-label="Telegram" class="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a :href="t.footer.socialInstagram" aria-label="Instagram" class="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a :href="t.footer.socialPhone" aria-label="Phone" class="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer__nav" v-for="col in t.footer.navCols" :key="col.title">
          <h4 class="footer__nav-title">{{ col.title }}</h4>
          <ul>
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" @click.prevent="scrollTo(link.href.replace('#',''))">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="footer__contact">
          <h4 class="footer__nav-title">{{ t.footer.footerContactTitle }}</h4>
          <div class="footer__contact-items">
            <div class="fc-item"><span>📍</span><span>{{ t.footer.footerAddress }}</span></div>
            <div class="fc-item"><span>📞</span><a :href="`tel:${t.footer.footerPhone.replace(/\s/g,'')}`">{{ t.footer.footerPhone }}</a></div>
            <div class="fc-item"><span>✉️</span><a :href="`mailto:${t.footer.footerEmail}`">{{ t.footer.footerEmail }}</a></div>
            <div class="fc-item"><span>🕐</span><span>{{ t.footer.footerHours }}</span></div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span>{{ t.footer.copyright }}</span>
        <div class="footer__bottom-links">
          <a href="#">{{ t.footer.privacyLabel }}</a>
          <a href="#">{{ t.footer.termsLabel }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useContent } from '../composables/useContent.js'

const { t } = useContent()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.footer { background: var(--clr-primary-dark); color: rgba(255,255,255,0.85); padding: 64px 0 0; }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.1); }

.footer__logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; color: #fff; }
.logo-icon { width: 44px; height: 44px; background: rgba(255,255,255,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; }
.logo-main { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 0.06em; }
.logo-sub { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.55); }

.footer__desc { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 24px; max-width: 280px; }
.footer__social { display: flex; gap: 10px; }
.social-btn { width: 38px; height: 38px; background: rgba(255,255,255,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.8); transition: all 0.2s; }
.social-btn:hover { background: var(--clr-accent); color: #fff; transform: translateY(-2px); }

.footer__nav-title { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 18px; }
.footer__nav ul { display: flex; flex-direction: column; gap: 10px; }
.footer__nav a { font-size: 14px; color: rgba(255,255,255,0.7); transition: color 0.2s; }
.footer__nav a:hover { color: var(--clr-accent-light); }

.footer__contact-items { display: flex; flex-direction: column; gap: 12px; }
.fc-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.7); }
.fc-item a { color: rgba(255,255,255,0.7); transition: color 0.2s; }
.fc-item a:hover { color: var(--clr-accent-light); }

.footer__bottom { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-size: 13px; color: rgba(255,255,255,0.4); flex-wrap: wrap; gap: 12px; }
.footer__bottom-links { display: flex; gap: 24px; }
.footer__bottom-links a { color: rgba(255,255,255,0.4); transition: color 0.2s; }
.footer__bottom-links a:hover { color: rgba(255,255,255,0.7); }

@media (max-width: 900px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .footer__grid { grid-template-columns: 1fr; gap: 32px; } .footer__bottom { flex-direction: column; text-align: center; } }
</style>
