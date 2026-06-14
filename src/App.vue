
<template>
  <!-- Router outlet: renders matched route component -->
  <RouterView />
</template>

<script>

import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: { RouterView },
}
</script>

