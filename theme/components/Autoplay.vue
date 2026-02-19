<script setup lang="ts">
import {onSlideEnter, onSlideLeave, useNav} from '@slidev/client'

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
})

let autplayTimer = null;

onSlideEnter(() => {
  if (props.enabled !== true) return;
  autplayTimer = setTimeout(() => {
    if (nav.hasNext.value) {
      nav.nextSlide()
    } else {
      nav.go(props.restartAt)
    }
  }, props.seconds * 1000)
})

onSlideLeave(() => {
  clearTimeout(autplayTimer)
})
</script>

<template>
</template>
