<script setup lang="ts">
import CustomImage from "../components/CustomImage.vue";

const props = defineProps({
  posterUrl: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout default">
    <h1><slot name="title" /></h1>
    <div class="announcement-row">
      <div class="announcement-poster">
        <CustomImage :src="posterUrl" :decoration="'taped'"/>
      </div>
      <div class="announcement-aside">
        <slot name="aside" />
      </div>
    </div>
  </div>
  <slot/>
</template>

<style scoped>
.slidev-layout h1 {
  color: white;
  font-size: 36pt;
  font-style: italic;
  font-weight: 700;
  margin-bottom: 4rem;
  text-align: center;
}

.announcement-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.announcement-poster {
  width: 55%;
}

.announcement-aside {
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-aside :deep(img) {
  width: 100pt;
  height: 100pt;
}
</style>