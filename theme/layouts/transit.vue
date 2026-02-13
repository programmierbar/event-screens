<script setup lang="ts">
import TransitSchedule from "../components/TransitSchedule.vue";
</script>

<template>
  <div class="slidev-layout default">
    <h1>Verbindungen</h1>
    <TransitSchedule />
    <slot />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 3rem;
}
</style>