<script setup lang="ts">
import CustomImage from "../components/CustomImage.vue";
</script>

<template>
  <div class="slidev-layout default">
    <h1>Speedtesting</h1>
    <div class="testing-row">
      <div class="testing-details">
        <p>Teste die neuesten Features unserer Spiele und gib uns Feedback.</p>
        <CustomImage src="/assets/speedtesting.png" :decoration="'taped'"/>
      </div>
      <div class="testing-person">
        <p>Komm gerne <br/> auf mich zu</p>
        <slot name="person" />
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

.testing-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.testing-details {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testing-details p {
  font-weight: bolder;
  font-size: 18pt;
  line-height: 1.2em;
  margin-bottom: 4rem;
}

.testing-details :deep(img) {
  max-width: 200px;
}

.testing-person {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.testing-person p {
  color: #cfff00;
  font-size: 32px;
  font-weight: bolder;
  rotate: -15deg;
  line-height: 1.2em;
  margin-bottom: 4rem;
}

.testing-person :deep(img) {
  height: 125pt;
  border-radius: 50%;
}

.testing-person :deep(span) {
  font-weight: bold;
  font-style: italic;
}
</style>