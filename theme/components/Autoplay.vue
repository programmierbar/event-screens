<script setup lang="ts">
import { onSlideEnter, useNav } from '@slidev/client'

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
})

onSlideEnter(() => {
  if (props.enabled === true)
  setTimeout(() => {
    if (nav.hasNext) {
      nav.next()
    } else {
      nav.goFirst()
    }
  }, props.seconds * 1000)
})
</script>

<template>
</template>
