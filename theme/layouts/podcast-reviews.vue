<script setup lang="ts">
import CustomImage from "../components/CustomImage.vue";

const reviews = [
  'review_01.png',
  'review_02.png',
  'review_03.png',
  'review_04.png',
  'review_05.png',
  'review_06.png',
  'review_07.png',
  'review_08.png',
  'review_09.png',
  'review_10.png',
]

const getRandomAndUniqueReviews = () => {
  const shuffledReviews = reviews.sort(() => Math.random() - 0.5);
  return shuffledReviews.slice(0, 6);
}

const randomAndUniqueReviews = getRandomAndUniqueReviews();
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <h1>Danke!</h1>
      <div class="reviews">
        <CustomImage v-for="review in randomAndUniqueReviews" :key="review" :src="`/reviews/${review}`" />
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  font-style: italic;
  margin-bottom: 3rem;
}

.reviews {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.reviews img {
  width: 250px;
  height: auto;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>