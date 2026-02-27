<script setup lang="ts">/**
 * We need this component to handle different url paths for each slide set
 */
import {computed} from "vue";

let props = defineProps<{
  src: string,
  decoration?: string
}>()

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const tapeRotations = [
  randomInRange(-15, 15),
  randomInRange(-15, 15),
  randomInRange(-15, 15),
  randomInRange(-15, 15),
]

const posterRotation = randomInRange(-3, 3);

const resolvedUrl = computed(() => {
  if (props.src.startsWith('/'))
    return import.meta.env.BASE_URL + props.src.slice(1)

  return props.src
})
</script>

<template>
  <div v-if="decoration === 'taped'" :class="decoration" :style="{ rotate: `${tapeRotations[0]}deg` }">
    <img :src="resolvedUrl" />
    <img class="tape one" src="../assets/tape.png" :style="{ transform: `translate(-50%, -50%) rotate(${tapeRotations[0]}deg)` }" />
    <img class="tape two" src="../assets/tape.png" :style="{ transform: `translate(50%, -50%) rotate(${tapeRotations[1]}deg)` }" />
    <img class="tape three" src="../assets/tape.png" :style="{ transform: `translate(-50%, 50%) rotate(${tapeRotations[2]}deg)` }" />
    <img class="tape four" src="../assets/tape.png" :style="{ transform: `translate(50%, 50%) rotate(${tapeRotations[3]}deg)` }" />
  </div>

  <img v-else :src="resolvedUrl" />
</template>

<style scoped>
.taped {
  display: inline-block;
  position: relative;
  rotate: 5deg;
}

.taped .tape {
  width: 70px;
  position: absolute;
}

.taped .tape.one {
  top: 0;
  left: 0;
}

.taped .tape.two {
  top: 0;
  right: 0;
}

.taped .tape.three {
  bottom: 0;
  left: 0;
}

.taped .tape.four {
  bottom: 0;
  right: 0;
}
</style>