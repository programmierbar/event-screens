<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <h1>Bleib auf dem Laufenden:</h1>
      <ul class="social-links">
        <li>
          <img src="../assets/socials/bluesky.svg" />
          <p>@programmier.bar</p>
        </li>
        <li>
          <img src="../assets/socials/mastodon.svg" />
          <p>@podcast@programmier.bar</p>
        </li>
        <li>
          <img src="../assets/socials/meetup.svg" />
          <p>programmier.bar</p>
        </li>
      </ul>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout h1 {
  color: white;
  font-size: 42pt;
  font-style: italic;
  font-weight: 700;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.social-links {
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.social-links li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-links img {
  height: 180px;
  width: auto;
}

.social-links p {
  font-size: 16pt;
  margin-top: 0;
}
</style>