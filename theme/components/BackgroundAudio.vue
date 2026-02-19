<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNav } from "@slidev/client";

const nav = useNav()
const audio = ref<HTMLAudioElement>()

onMounted(() => {
  audio.value?.play().catch(() => {
    // Browsers may block autoplay without user interaction.
    // Add a one-time click listener to start playback.
    const start = () => {
      audio.value?.play()
      document.removeEventListener('click', start)
      document.removeEventListener('keyup', start)
      setTimeout(() => nav.nextSlide(), 15000)
    }
    document.addEventListener('click', start)
    document.addEventListener('keyup', start)
  })
})
</script>

<template>
  <audio ref="audio" src="/assets/news_intro.mp3" autoplay />
</template>
