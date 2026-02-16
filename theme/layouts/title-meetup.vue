<script setup lang="ts">
import CustomImage from "../components/CustomImage.vue";
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <img src="../assets/logo-inline.svg" class="logo" />
      <CustomImage :src="'/assets/meetup.svg'" />
      <div class="icons">
        <img src="../assets/logo-talk.svg" />
        <img src="../assets/drinks.svg" />
        <img src="../assets/handshake.svg" />
      </div>
    <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout img {
  width: 75%;
}

.slidev-layout .logo {
  width: 45%;
}

.icons {
  display: flex;
  gap: 0.1rem;
}

.icons img {
  width: auto;
  height: 200px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>