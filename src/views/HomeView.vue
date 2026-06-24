<template>
  <div id="app-root">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <ServicesSection />
      <RoomsSection />
      <GallerySection />
      <ContactSection />
    </main>
    <FooterSection />

  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import VideoSection from '../components/VideoSection.vue'
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

</style>
