<!-- MOLECULE — KeyNumber. Large light numeral + red accent bar + label. -->
<template>
  <div class="epfl-keynumber">
    <div class="epfl-keynumber-num"><span v-if="pre" class="pre">{{ pre }}</span>{{ value }}</div>
    <div class="epfl-keynumber-bar" />
    <div class="epfl-keynumber-label">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  pre: String,
  value: [String, Number],
  label: String,
})
</script>
