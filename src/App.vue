<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
</script>

<style>
body {
  margin: 0;
}
.layout {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
