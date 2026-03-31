<script setup lang="ts">
import { computed } from 'vue'
import {urlResolver} from "../util/urlResolver";
import dataProvider from "../util/dataProvider";

const props = defineProps({
  meetup: { type: String, default: '', required: true },
  fallbackImageUrl: { type: String, default: '' },
})

const resolvedUrl = computed(() => {
  if (props.meetup === 'current') {
    return urlResolver(dataProvider.getData().posters.currentUrl || props.fallbackImageUrl)
  }

  if (props.meetup === 'next') {
    return urlResolver(dataProvider.getData().posters.nextUrl || props.fallbackImageUrl)
  }

  throw new Error(`Unknown meetup: ${props.meetup}`)
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