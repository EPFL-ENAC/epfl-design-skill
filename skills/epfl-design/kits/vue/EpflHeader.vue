<!-- ORGANISM — Header. Main nav with the 7×6px red active dot + EN/FR/DE switch.
     `logo` defaults to the repo asset path; override it for your app's public path. -->
<template>
  <header class="epfl-header" role="banner">
    <a class="epfl-logo" href="#"><img :src="logo" alt="EPFL" /></a>
    <nav class="epfl-nav" aria-label="Main">
      <a
        v-for="label in items"
        :key="label"
        href="#"
        :class="{ active: label === active }"
      >{{ label }}</a>
    </nav>
    <div class="epfl-search">
      <input type="search" placeholder="Search EPFL" aria-label="Search" />
    </div>
    <div class="epfl-lang">
      <a v-for="(lang, i) in langs" :key="lang" :class="{ on: lang === activeLang || (!activeLang && i === 0) }">{{ lang }}</a>
    </div>
  </header>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => ['Education', 'Research', 'Innovation', 'Schools', 'Campus'] },
  active: { type: String, default: 'Research' },
  langs: { type: Array, default: () => ['EN', 'FR', 'DE'] },
  activeLang: { type: String, default: '' },
  logo: { type: String, default: '/assets/svg/epfl-logo.svg' },
})
</script>
