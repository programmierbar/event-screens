<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
    <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout :deep(h1) {
  color: white;
  font-size: 42pt;
  font-style: italic;
  font-weight: 600;
  text-align: center;
  line-height: 1.1;
}

.slidev-layout :deep(p) {
  font-size: 24pt;
  font-style: italic;
  font-weight: 600;
  text-align: center;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>