<script setup lang="ts">
defineProps({
  titleVariant: {       // Can be 'podcast' or 'meetup'
    type: String,
    default: 'meetup'
  }
})
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <img src="../assets/logo-inline.svg" class="logo" />
      <img v-if="titleVariant === 'meetup'" src="./../assets/meetup.svg" />
      <img v-else src="./../assets/podcast.svg" />
      <div class="icons" v-if="titleVariant === 'meetup'">
        <img src="../assets/logo-talk.svg" />
        <img src="../assets/drinks.svg" />
        <img src="../assets/handshake.svg" />
      </div>
      <div class="icons" v-else>
        <img src="../assets/bits.svg" />
        <img src="../assets/microphone.svg" />
        <img src="../assets/play.svg" />
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
  margin-bottom: 1.5rem;
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