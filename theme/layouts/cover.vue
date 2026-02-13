<script setup lang="ts">
defineProps({
  imageUrl: { type: String, default: '' },
})

</script>

<template>
  <div class="slidev-layout w-full h-full">
    <div class="cover-image" :style="{ backgroundImage: `url(${imageUrl})` }">
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