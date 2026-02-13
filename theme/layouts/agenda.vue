<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <h1>
      <slot name="title" />
    </h1>
    <slot name="agenda" />
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