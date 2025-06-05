<template>
  <nav class="sidebar">
    <NavigationMenu>
      <NavigationMenuItem>
        <RouterLink to="/chat">Chat</RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <RouterLink to="/settings">Settings</RouterLink>
      </NavigationMenuItem>
    </NavigationMenu>
  </nav>
</template>

<script setup>
import { NavigationMenu, NavigationMenuItem } from 'shadcn-vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  width: 220px;
  padding: 1rem;
  border-right: 1px solid #e2e8f0;
  background-color: #fafafa;
}
</style>
