<script setup lang="ts">
import dataProvider from "../util/dataProvider";

const schedules = dataProvider.getData().transit;
</script>

<template>
  <div v-for="schedule in schedules" :key="schedule.to">
    <h2>{{ schedule.to }}</h2>
    <ul>
      <li v-for="connection in schedule.connections" :key="connection.departing">
        <span class="departing">{{ connection.departing }} Uhr </span><span class="arriving"> - {{ connection.arriving }} Uhr</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 2rem;
  font-weight: lighter;
}

li {
  list-style: disc;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.departing {
  font-weight: bold;
}
span.arriving {
  color: #888;
  font-weight: lighter;
}

</style>