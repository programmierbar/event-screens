<script setup lang="ts">

interface Schedule {
  to: string;
  connections: {
    departing: string,
    arriving: string,
  }[];
}

const schedules: Schedule[] = [
  {
    to: 'Frankfurt',
    connections: [
      {
        departing: '20:57',
        arriving: '21:25',
      },
      {
        departing: '21:41',
        arriving: '22:07',
      },
      {
        departing: '21:57',
        arriving: '22:25',
      },
    ]
  },
  {
    to: 'Gießen',
    connections: [
      {
        departing: '21:02',
        arriving: '21:26',
      },
      {
        departing: '21:18',
        arriving: '21:34',
      },
      {
        departing: '22:03',
        arriving: '22:26',
      },
    ]
  }
];

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