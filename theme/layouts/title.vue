<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
    <h1>Herzlich willkommen!</h1>
    <img :src="'/assets/meetup.svg'" />
    <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout h1 {
  color: white;
  font-size: 36pt;
  font-style: italic;
  font-weight: 700;
}

.slidev-layout img {
  width: 75%;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>