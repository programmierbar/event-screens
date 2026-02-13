<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="center">
      <div>
        <div class='quote'>
          <div class='quoted-text'>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout .quote {
  position: relative;
}

.slidev-layout .quoted-text:before {
  content: "“";
  font-size: 100pt;
  font-style: italic;
  color: #cfff00;
  position: relative;
  top: 4rem;
  line-height: 0.5rem;
  margin-right: 0.8rem;
}

.slidev-layout .quoted-text:after {
  content: "”";
  font-size: 100pt;
  font-style: italic;
  color: #cfff00;
  position: absolute;
  bottom: -1.7rem;
  line-height: 0;
}

.slidev-layout .quoted-text :slotted(p) {
  font-size: 24pt;
  font-style: italic;
  line-height: inherit;
  display: inline;
}

.slidev-layout .center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>