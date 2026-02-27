<script setup lang="ts">
import {onSlideEnter, onSlideLeave, useNav} from '@slidev/client'
import {ref} from "vue";

const nav = useNav()

const props = defineProps({
  seconds: {
    type: Number,
    default: 5,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  restartAt: {
    type: Number,
    default: 1,
  },
  refreshAfter: {
    type: Number,
    default: 10,
  },
})

let autoplayTimer = null;

const runs = ref(0);

onSlideEnter(() => {
  if (props.enabled !== true) return;
  autoplayTimer = setTimeout(() => {
    if (nav.hasNext.value) {
      nav.nextSlide()
    } else {
      runs.value++;
      // if enough runs have passed, force refresh of page to reload content
      if (runs.value >= props.refreshAfter) {
        runs.value = 0;
        const url = new URL(window.location.toString());
        const segments = url.pathname.split('/');
        segments.pop();
        url.pathname = segments.join('/');
        window.location.assign(url.toString());
      }
      nav.go(props.restartAt)
    }
  }, props.seconds * 1000)
})

onSlideLeave(() => {
  clearTimeout(autoplayTimer)
})
</script>

<template>
</template>
