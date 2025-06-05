<template>
  <header class="header">
    <h1>DaoChat</h1>
    <RouterLink to="/settings">Settings</RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
}
</style>
