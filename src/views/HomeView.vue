<template>
  <div id="app-root">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <RoomsSection />
      <GallerySection />
      <ContactSection />
    </main>
    <FooterSection />

    <!-- Temporary admin access button — remove before final handoff -->
    <RouterLink to="/admin" class="admin-fab" title="Admin Panel">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </RouterLink>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import RoomsSection from '../components/RoomsSection.vue'
import GallerySection from '../components/GallerySection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<style>
#app-root {
  min-height: 100vh;
}

.admin-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  width: 44px;
  height: 44px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  color: rgba(255,255,255,0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.2s;
  text-decoration: none;
}
.admin-fab:hover {
  background: rgba(15, 23, 42, 0.95);
  color: #fff;
  transform: scale(1.08);
}
</style>
