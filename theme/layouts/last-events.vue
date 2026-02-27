<script setup lang="ts">
const meetups = [
  {
    title: 'Your UI is dead. Make it alive!',
    subtitle: 'Sven Szota & Julian Müller'
  },
  {
    title: 'Headless Apps in Rust',
    subtitle: 'Marcel Koch'
  },
  {
    title: 'Security in Games',
    subtitle: 'Philip Klostermeyer'
  },
  {
    title: 'AI und künstliche Stimmerzeugung',
    subtitle: 'Thorsten Müller'
  },
  {
    title: 'Signals in Depth',
    subtitle: 'Garrelt Mock'
  },
  {
    title: 'The Thinking Game',
    subtitle: 'programmier.bar Kino'
  },
  {
    title: 'Gamification in der Wissenschaft',
    subtitle: 'Prof. Stephan Jacob'
  },
  {
    title: 'Von Security und Weltverbesser:innen',
    subtitle: 'Georg Dresler, Aurelius Lie & Xenija Neufeld'
  },
  {
    title: 'Data in Games',
    subtitle: 'Rafet Sifa & Wessel van de Goor'
  },
  {
    title: 'Svelte 5 & 3D-Entwicklung …',
    subtitle: 'Simon Holthausen, Grischa Erbe & Jona Kukatzki'
  }
]

</script>

<template>
  <div class="slidev-layout w-full h-full">
    <div class="cover-image">
      <div class="bg-layer bg-1" />
      <div class="bg-layer bg-2" />
      <div class="bg-layer bg-3" />
      <div class="bg-layer bg-4" />
      <div class="bg-layer bg-5" />
      <div class="content">
        <h1>Letzte Meetups</h1>
        <ul>
          <li v-for="meetup in meetups.slice(0,9) " :key="meetup.title">
            <span class="title">{{ meetup.title }}</span>
            <span class="subtitle">{{ meetup.subtitle }}</span>
          </li>
        </ul>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout {
  padding: 0;
  background: none;
  background-color: black;
}

.cover-image {
  position: relative;
  height: 100%;
  width: 100%;
}

.bg-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
}

.bg-1 {
  background-image: url('./../assets/last-events/last-event_01.png');
  animation: fade-1 15s infinite;
}
.bg-2 {
  background-image: url('./../assets/last-events/last-event_02.png');
  animation: fade-2 15s infinite;
}
.bg-3 {
  background-image: url('./../assets/last-events/last-event_03.png');
  animation: fade-3 15s infinite;
}
.bg-4 {
  background-image: url('./../assets/last-events/last-event_04.png');
  animation: fade-4 15s infinite;
}
.bg-5 {
  background-image: url('./../assets/last-events/last-event_05.png');
  animation: fade-5 15s infinite;
}

/**
  - 5 stacked background layers (.bg-layer.bg-1 through .bg-5) sit behind the content, each with its own image
  - .content wrapper with position: relative; z-index: 1 keeps the text above the background layers
  - 5 separate @keyframes crossfade via opacity — each image holds fully visible for ~2.25s, then smoothly fades over ~0.75s into the next one
  - The total cycle is still 15s (3s per image), and the last image crossfades back into the first
 */

@keyframes fade-1 {
  0%   { opacity: 1; }
  15%  { opacity: 1; }
  20%  { opacity: 0; }
  95%  { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fade-2 {
  0%   { opacity: 0; }
  15%  { opacity: 0; }
  20%  { opacity: 1; }
  35%  { opacity: 1; }
  40%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes fade-3 {
  0%   { opacity: 0; }
  35%  { opacity: 0; }
  40%  { opacity: 1; }
  55%  { opacity: 1; }
  60%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes fade-4 {
  0%   { opacity: 0; }
  55%  { opacity: 0; }
  60%  { opacity: 1; }
  75%  { opacity: 1; }
  80%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes fade-5 {
  0%   { opacity: 0; }
  75%  { opacity: 0; }
  80%  { opacity: 1; }
  95%  { opacity: 1; }
  100% { opacity: 0; }
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;

  /** Applying the usual slide paddings onto the content within the image */
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

h1 {
  margin-bottom: 3rem;
}

li {
  margin-bottom: 0.75rem;
  list-style: none;
  margin-left: 1.5rem;
}

li:first-child {
  color: rgb(233, 41, 128);
  list-style: none;
  margin-left: 0;
}

li:first-child::before {
  content: '';
  display: inline-block;
  margin-top: -0.2rem;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  vertical-align: middle;
  background: url('./../assets/arrow.svg') no-repeat center;
  background-size: contain;
}

.title {
  font-weight: bold;
}

.subtitle {
  font-weight: lighter;
  margin-left: 0.5rem;
}
</style>