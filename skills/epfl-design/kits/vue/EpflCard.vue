<!-- MOLECULE — Card. `distinction` adds the signature red flag + top border. -->
<template>
  <article :class="['epfl-card', { 'epfl-card-distinction': distinction }]">
    <div v-if="image" class="epfl-card-img" :style="{ backgroundImage: `url(${image})` }" />
    <span v-if="distinction" class="epfl-card-flag" />
    <div class="epfl-card-body">
      <div class="epfl-card-info">{{ category }}<template v-if="date"> · {{ date }}</template></div>
      <h3 class="epfl-card-title">{{ title }}</h3>
      <p class="epfl-card-text"><slot /></p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  image: String,
  category: String,
  date: String,
  title: String,
  distinction: { type: Boolean, default: false },
})
</script>
