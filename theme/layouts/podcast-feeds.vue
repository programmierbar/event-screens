<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <h1>Überall zu finden, <br/>wo es Podcasts gibt:</h1>
      <div class="icons">
        <img src="../assets/podcast-feeds/spotify.svg" />
        <img class="apple" src="../assets/podcast-feeds/apple-podcasts.svg" />
        <div class="programmierbar-logo">
          <img src="../assets/logo-inline.svg" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  font-size: 36pt;
  font-style: italic;
  font-weight: 700;
  text-align: center;
  line-height: 3.5rem;
}

.icons {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 4rem;
}

.icons img, .icons div {
  height: 40px;
  width: auto;
}

.apple {
  border: 1px solid white;
  border-radius: 7pt;
}

.programmierbar-logo {
  background-color: black;
  padding: 5pt 8pt;
  border: 1px solid #cfff00;
  border-radius: 7pt;
 }

.programmierbar-logo img {
  height: 100%;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>