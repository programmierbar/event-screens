<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import CustomImage from "../components/CustomImage.vue";
import coverProvider from "../util/coverProvider";

interface CoverSlot {
  current: string
  next: string | null
  transitioning: boolean
}

const slots = ref<CoverSlot[]>(
  coverProvider.getCovers(28).map(c => ({ current: c, next: null, transitioning: false }))
)

const TRANSITION_MS = 1000
const COVER_POPUP_INTERVAL = 1000

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(async () => {
    const available = slots.value.filter(s => !s.next)
    if (available.length === 0) return

    const slot = available[Math.floor(Math.random() * available.length)]
    const [newCover] = coverProvider.getCovers(1)

    slot.next = newCover
    await nextTick()
    slot.transitioning = true

    setTimeout(() => {
      slot.current = slot.next!
      slot.next = null
    }, TRANSITION_MS+100)
  }, COVER_POPUP_INTERVAL)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="slidev-layout w-full h-full podcast-covers">
    <div class="cover-grid">
      <div v-for="(slot, index) in slots" :key="index" class="cover-grid-item">
        <CustomImage :src="`/covers/${slot.current}`" />
        <CustomImage
          v-if="slot.next"
          :src="`/covers/${slot.next}`"
          class="cover-next"
          :class="{ 'cover-visible': slot.transitioning }"
        />
      </div>
      <div class="gradient">
        <h1>Über 450 Folgen</h1>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
h1 {
  color: white;
}

.gradient {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 150pt;
  background: linear-gradient(to bottom, transparent, black);
  display: flex;
  align-items: flex-end;
  padding: 30px;
}

.podcast-covers {
  padding: 0;
  overflow: hidden;
}

.cover-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  width: 100%;
}

.cover-grid-item {
  position: relative;
  overflow: hidden;
}

.cover-grid-item :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-grid-item :deep(.cover-next) {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1s ease;
}

.cover-grid-item :deep(.cover-next.cover-visible) {
  opacity: 1;
}
</style>