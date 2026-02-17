<script setup lang="ts">
import {onSlideEnter, onSlideLeave, useNav} from '@slidev/client'

const nav = useNav()

const props = defineProps({
  clicks: {
    type: Array,
    default: [100],
  }
})

let timers = [];

onSlideEnter(() => {
  props.clicks.forEach((click: number) => {
    console.log(`Clicking in ${click}ms`)
    setTimeout(() => {
      console.log(`Clicking...`)
      nav.next();
    }, click)
  })
})

onSlideLeave(() => {
  timers.forEach(timer => clearTimeout(timer))
})

</script>

<template>
</template>
