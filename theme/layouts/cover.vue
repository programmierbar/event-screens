<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  imageUrl: { type: String, default: '' },
})

const resolvedUrl = computed(() => {
  if (props.imageUrl.startsWith('/'))
    return import.meta.env.BASE_URL + props.imageUrl.slice(1)
  return props.imageUrl
})
</script>

<template>
  <div class="slidev-layout w-full h-full">
    <div class="cover-image" :style="{ backgroundImage: `url(${resolvedUrl})` }">
      <slot />
    </div>
  </div>
</template>

<style scoped>

.slidev-layout {
  padding: 0;
  background: none;
  background-color: black;
}

.cover-image {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>