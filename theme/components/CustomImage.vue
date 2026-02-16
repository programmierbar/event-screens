<script setup lang="ts">/**
 * We need this component to handle different url paths for each slide set
 */
import {computed} from "vue";

let props = defineProps<{ src: string }>()

const resolvedUrl = computed(() => {
  if (props.src.startsWith('/'))
    return import.meta.env.BASE_URL + props.src.slice(1)

  return props.src
})
</script>

<template>
  <img :src="resolvedUrl" />
</template>

<style scoped>
</style>