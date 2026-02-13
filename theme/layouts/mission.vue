<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default fullscreen">
    <div class="center">
      <div class="mission-statement">
        <img src="../assets/logo-inline.svg" />
        <span> : Die Plattform für Web- & App-Entwickler:innen. Podcast, Meetups & Community.</span>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>

.slidev-layout .mission-statement {
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
}

img {
  display: inline;
  height: 3rem;
  width: auto;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>