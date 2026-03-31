<script setup lang="ts">
import dataProvider from "../util/dataProvider";

const agenda = dataProvider.getData().agenda;
const processedAgenda = agenda.schedule.map(item => {
  let title = item.title;
  let time = item.time;

  if (item.isTalks) {
    time = `<span class="highlighted-text">${item.time}</span>`
    let talks = agenda.talks.map(talk => {
      return `<span class="highlighted-text"><strong>Vortrag: „${talk.title}”</strong> <br/>mit ${talk.speaker}</span>`
    });
    title = talks.join('<br/>');
  }

  return {
    time,
    title
  }
})
</script>

<template>
  <div class="slidev-layout default">
    <h1>
      Agenda
    </h1>
    <table>
      <thead><tr><th></th><th></th></tr></thead>
      <tbody>
      <tr v-for="(item, index) in processedAgenda" :key="index">
        <td v-html="item.time"></td>
        <td v-html="item.title"></td>
      </tr>
      </tbody>
    </table>
    <p>Für Snacks und Getränke ist durchgehend gesorgt.</p>
    <slot />
  </div>
</template>

<style>
.slidev-layout table thead tr, .slidev-layout table tbody tr {
  border-bottom: none;
}

.slidev-layout table thead tr, .slidev-layout table tbody tr {
  border-bottom: none;
}

.slidev-layout table td {
  font-weight: 400;
}

.slidev-layout table td:first-child {
  font-weight: 600;
}
</style>