<!-- ORGANISM — Footer. Four-column dark footer with the negative logo + legal row.
     Pass `cols` to customize columns; `logo` defaults to the repo asset path. -->
<template>
  <footer class="epfl-footer">
    <div class="epfl-footer-top">
      <img :src="logo" alt="EPFL" class="epfl-footer-logo" />
      <div class="epfl-footer-cols">
        <div v-for="col in cols" :key="col.title">
          <h6>{{ col.title }}</h6>
          <a v-for="link in col.links" :key="link" href="#">{{ link }}</a>
        </div>
      </div>
    </div>
    <div class="epfl-footer-bottom">
      <div>{{ copyright }}</div>
      <div><slot name="legal"><a href="#">Legal</a> · <a href="#">Privacy</a> · <a href="#">Accessibility</a></slot></div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  logo: { type: String, default: '/assets/svg/epfl-logo-negative.svg' },
  copyright: { type: String, default: '© 2026 EPFL — All rights reserved' },
  cols: {
    type: Array,
    default: () => [
      { title: 'About', links: ['Education', 'Research', 'Innovation', 'Campus'] },
      { title: 'For students', links: ['Bachelor', 'Master', 'PhD', 'Continuing'] },
      { title: 'Contact', links: ['Directory', 'Library', 'Press', 'Jobs'] },
      { title: 'Follow', links: ['LinkedIn', 'YouTube', 'Bluesky', 'Newsletter'] },
    ],
  },
})
</script>
