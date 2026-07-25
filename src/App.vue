<template>
  <router-view />
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  background: var(--dashboard-bg);
  color: var(--dashboard-text);
  font-family: var(--font-sans);
}
#app {
  min-height: 100dvh;
}
</style>
