<template>
  <header class="header">
    <h1>DaoChat</h1>
    <div class="actions">
      <Button @click="exportChat" size="sm">Export</Button>
      <RouterLink to="/settings">Settings</RouterLink>
    </div>
</header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { Button } from "shadcn-vue";
import { useChatStore } from "../stores/chat";

const chat = useChatStore();

function exportChat() {
  const data = JSON.stringify(chat.messages, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chat-export.json";
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
}
.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.actions button {
  padding: 0.25rem 0.5rem;
}
</style>
