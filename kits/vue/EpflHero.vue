<!-- ORGANISM — Hero. The signature white text panel overlapping a full-bleed photo. -->
<template>
  <section class="epfl-hero">
    <div class="epfl-hero-text">
      <h1 class="epfl-hero-title">{{ title }}</h1>
      <div class="epfl-hero-content"><slot /></div>
    </div>
    <div
      class="epfl-hero-img"
      :style="{ backgroundImage: `url(${image})` }"
      role="img"
      :aria-label="title"
    />
  </section>
</template>

<script setup>
defineProps({
  title: String,
  image: String,
})
</script>
