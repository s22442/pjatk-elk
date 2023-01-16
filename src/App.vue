<script setup lang="ts">
import TheCookieBanner from '~/components/&app/TheCookieBanner.vue';

import { isDark } from '~/composables/dark';

useHead({
  title: 'ELK',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff')),
    },
  ],
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <BaseFadeTransition appear>
      <component :is="Component" />
    </BaseFadeTransition>
  </RouterView>
  <TheCookieBanner />
</template>
