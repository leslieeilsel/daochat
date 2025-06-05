<script setup>
import ChatSidebar from '../components/ChatSidebar.vue'
import ChatMessageList from '../components/ChatMessageList.vue'
import ChatInput from '../components/ChatInput.vue'
import AppHeader from '../components/AppHeader.vue'
import { useChatStore } from '../stores/chat'

const chat = useChatStore()
</script>

<template>
  <div class="page">
    <AppHeader />
    <div class="body">
      <ChatSidebar />
      <div class="main">
        <ChatMessageList :messages="chat.messages" />
        <ChatInput :loading="chat.loading" @send="chat.sendMessage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.body {
  display: flex;
  flex: 1;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
