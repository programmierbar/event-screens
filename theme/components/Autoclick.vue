<script setup lang="ts">
import { onSlideEnter, onSlideLeave, useNav } from '@slidev/client'

const nav = useNav()

const { seconds = [1] } = defineProps<{
  seconds: number[]
}>()

let timers: ReturnType<typeof setTimeout>[] = [];

onSlideEnter(() => {
  seconds.forEach((timeOutSeconds: number) => {
    console.log(`Clicking in ${timeOutSeconds}s`)
    timers.push(setTimeout(() => {
      console.log(`Clicking after ${timeOutSeconds}ms`)
      nav.next();
    }, timeOutSeconds * 1000))
  })
})

onSlideLeave(() => {
  timers.forEach(timer => clearTimeout(timer))
})

</script>

<template>
</template>
